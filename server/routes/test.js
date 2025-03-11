import {Router} from "express"
import Test from "../models/testModel.js";
import generateJeeQuestion from "../utils/generateJeeQuestion.js";

const router = Router();

router.post("/generate" , async (req,res) => {
    let {difficulty , subjects , topics} = req.body;
    subjects = Array.isArray(subjects) ? subjects : [subjects];
    topics = Array.isArray(topics) ? topics : [topics];
    const question = await generateJeeQuestion(difficulty , subjects , topics);

    let questionContent = question.content;

    questionContent = questionContent.trim();

    questionContent = questionContent.replace(/```json/g, '').replace(/```/g, '');

    try {
        const questions = JSON.parse(questionContent);
        console.log(JSON.stringify(questions));
        const testData = {userId:"1" , questions}
        const newtest = new Test(testData)
        const test = await newtest.save();
        res.status(200).json({ test, status:true });
    } catch (error) {
        console.log('Error parsing JSON:', error);
        res.status(500).json({ error: 'Failed to parse question data' , status:false });
    }
})

router.post("/submit" , async (req,res)=>{
    const {answers , testId} = req.body;

    const test = await Test.findById(testId);
    if(test){

        try {
        
            test.answers = answers;
            await test.save();
            return res.json({status:true})

        } catch (error) {
            console.log(error);
            return res.json({error , status:false});
        }

    }
    else{
        return res.json({error:"No test found" , status:false});
    }
})

export default router
const BASEURL = process.env.NEXT_PUBLIC_Backend_Route;

export const generateQuestionsRoute = `${BASEURL}/test/generate`;
export const submitQuestionsRoute = `${BASEURL}/test/submit`;
export const signUpRoute = `${BASEURL}/auth/signup`
export const signInRoute = `${BASEURL}/auth/signin`
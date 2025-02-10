import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp signInFallbackRedirectUrl="/auth" forceRedirectUrl="/auth" />
};

export default SignUpPage;
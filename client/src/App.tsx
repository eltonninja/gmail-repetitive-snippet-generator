import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import { useSnippets } from "./hooks/useSnippets";
import { ReactComponent as GoogleLogo } from "./assets/google.svg";

function App() {
  const [accessToken, setAccessToken] = useState("");

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
    },
    scope: "https://www.googleapis.com/auth/gmail.readonly",
  });

  const { data: snippets, isLoading } = useSnippets({ accessToken });

  return (
    <div className="bg-gray-200 w-full h-full min-h-screen p-7">
      {accessToken ? (
        !snippets || isLoading ? (
          <div className="flex items-center justify-center">
            <div className="loader w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin mr-2"></div>
            Generating snippets
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {snippets.map((snippet, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                <p>{snippet}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        <button
          onClick={() => login()}
          className="m-auto flex items-center justify-center bg-gray-100 p-2 gap-x-4 text-gray-800 cursor-pointer font-semibold rounded-md hover:bg-white hover:shadow-lg"
          style={{ textDecoration: "none" }}
        >
          <GoogleLogo className="h-8" />
          Analyze your google mails 🚀
        </button>
      )}
    </div>
  );
}

export default App;

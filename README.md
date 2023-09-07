# Gmail Repetitive Snippet Generator

This project aims to analyze a user's sent Gmail messages to generate snippets of repetitive text. These snippets can be highly useful for individuals seeking to understand common themes or frequently shared information in their communications.

## Features:

- Integration with the Gmail API to fetch sent emails.
- Analysis of repetitive text patterns for insightful snippet generation.
- Easy and user-friendly interface to view and interact with generated snippets.

## Prerequisites:

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- Google Cloud Platform account to generate OAuth 2.0 credentials.

## Setup & Installation:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/eltonninja/gmail-repetitive-snippet-generator
   cd gmail-repetitive-snippet-generator
   ```

2. **Setting Up the Client**:

   ```bash
   cd client
   npm install
   ```

   Create a `.env` file in the client directory and set the following environment variables:

   ```
   REACT_APP_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
   REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
   REACT_APP_API_ENDPOINT=your_api_endpoint
   ```

   > **Note**: Make sure to generate your own `client_id` and `client_secret` from the Google Cloud Platform. Enable the Gmail API and add scopes to fetch sent emails.

3. **Setting Up the Server**:

   ```bash
   cd server
   npm install
   ```

   To start the server:

   ```bash
   node index
   ```

4. **Running the Project**:

   At the client directory:

   ```bash
   npm run start
   ```

   This will launch the application on `localhost:3000` or your specified port.

## Usage:

1. Navigate to the client URL.
2. Authenticate using your Gmail account.
3. Once authenticated, the server will analyze the last 100 sent messages from your Gmail.
4. View and interact with the 70 suggested snippets generated based on the analysis.

## Results:

The server analyzes the last 100 sent messages from the user's Gmail account and provides 70 insightful snippets from the analyzed content.

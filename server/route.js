const express = require("express");
const axios = require("axios");

const { removeQuotedContent } = require("./utils/removeQuotedContent");
const { extractSnippets } = require("./utils/extractSnippets");

const router = express.Router();

router.route("/analyze").get(async (req, res) => {
  try {
    const accessToken = req.query.token;
    const sentMessages = await axios
      .get(`https://gmail.googleapis.com/gmail/v1/users/me/messages`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          labelIds: "SENT",
          maxResults: 100,
        },
      })
      .then(async (response) => {
        const { messages } = response.data;
        const messageContents = [];

        const batchSize = 10;
        for (let i = 0; i < messages.length; i += batchSize) {
          console.log(i);
          let error = 1;
          while (error) {
            try {
              messageContents.push(
                ...(await Promise.all(
                  messages.slice(i, i + batchSize).map((message) =>
                    axios
                      .get(
                        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message["id"]}`,
                        {
                          headers: {
                            Authorization: `Bearer ${accessToken}`,
                          },
                        }
                      )
                      .then((response) => {
                        const parts = response.data.payload.parts;
                        const messageData =
                          parts && parts.length > 1
                            ? response.data.payload.parts[0].body.data
                            : response.data.payload.body.data;
                        if (messageData)
                          return removeQuotedContent(
                            Buffer.from(messageData, "base64").toString()
                          );
                        else return "";
                      })
                  )
                ))
              );
              error = 0;
            } catch (e) {
              error = 1;
            }
          }
        }

        return messageContents;
      })
      .then((response) => response.filter(Boolean));
    res.status(200).send(extractSnippets(sentMessages));
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: e.message,
    });
  }
});

module.exports = router;

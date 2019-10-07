const nodemailer = require("nodemailer");
const crypto = require("crypto");
const emoji = require("node-emoji");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const {GMAIL_USER, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, GG_OAUTH_LINK} = process.env;

exports.genToken = async() => {
	let buf = await crypto.randomBytes(20);
	return buf.toString("hex");
}

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, GG_OAUTH_LINK);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const accessToken = oauth2Client.getAccessToken();

async function send(to, subject, text) {
	let transport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			type: "OAuth2",
			user: GMAIL_USER,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken: REFRESH_TOKEN,
			access: accessToken
		}
	})
	let mailOptions = {
        from: GMAIL_USER,
		to, subject, text
    }
	transport.sendMail(mailOptions);
}

async function activate(to, viewname, id, host) {
	let subject = emoji.emojify(`:closed_lock_with_key: Activate your account - Kafka`);
	let text = `
Good day ${viewname}, this mail comes from Kafka,

Please click to the link below for completing the activation of your account:
https://${host}/activate/${id}

And that's all, thank you for your time. Have a good day and see you later.

This is the automatic email from the system, please do not reply.`;
	return send(to, subject, text);
}

module.exports = { activate }

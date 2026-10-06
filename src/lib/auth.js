
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { Resend } from 'resend';

const client = new MongoClient(process.env.MONGO_URI);
const resend = new Resend(process.env.RESEND_API_KEY);
const db = client.db("nadim_auth");

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: true
    
  },
    emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      void resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: user.email,
      subject: 'Verify Email',
      html:<p>`Click the link to verify your email: ${url}`</p> ,
    });
    },
    sendOnSignUp:true,
    autoSignInAfterVerification: true,
    expiresIn: 60*10
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    }
  },
      user: {
        changeEmail: {
            enabled: true,
        }
    },
  database: mongodbAdapter(db, {
    client,
  }),
});
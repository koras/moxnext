import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


export default NextAuth({
  providers: [
    GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     authorizationUrl:   process.env.AUTORIZATION_URL,
  // //    scope:  process.env.SCOPES,
  //     redirect_uri:process.env.REDIRECT_URL,


      
      clientId: "854331110586-ams6lqojo4dc3buer6ia5ov7jtjo92ca.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/profiles/google/callback",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    //   authorizationUrl:  "http://localhost:3000/api/auth/signin",
  //    scope:  process.env.SCOPES,
   //   redirect_uri:"http://localhost:3000/api/auth/callback/google",
  //    requestTokenUrl:"http://localhost:3000/",


    }),
  ],
  //  secret: process.env.SECRET,
   secret: "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",

  callbacks: {
    async signIn({ user, account, profile, email, credentials,}) {
      console.log('=========================================================================');
      console.log('=========================================================================');
      console.log('=========================================================================');
 
    //  console.log( user, account, profile, email, credentials );
      console.log( ' user ',user  );
      console.log( ' account ',account  );
      console.log( 'email ',email  );
      console.log( 'profile ',profile);
      console.log( 'credentials ',credentials);
      console.log('--------------------------------------------------------------------------');
      console.log('--------------------------------------------------------------------------');
      console.log('--------------------------------------------------------------------------');
      console.log('--------------------------------------------------------------------------');
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('url',url);
      console.log('baseUrl ',baseUrl );
      return baseUrl
    },
    async session({ session, user, token }) {

      if (!session?.user) {
        return session;
      }


      console.log('callbacks: session',session); 
      console.log('callbacks: user',user);
      console.log('callbacks: token',token);
//      return session
      return { ...session, uid: token.sub };
    },
    async jwt({ token, user, account, profile, isNewUser }) {

      if (user) {
        token.uid = user.id;
      }

      console.log('callbacks: token',token)
      return token
    }
  },

  session: {
     
   //  strategy: "database",
    strategy: "jwt",
    maxAge: 3000,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },


});




// name: 'Konstantin',
// email: 'privety@gmail.com',
// picture: 'https://lh3.googleusercontent.com/a/AEdFTp4Da7OWaT1noHAcP4InH5zno5nl6fLzCgYWBrxM3Q=s96-c',
// sub: '111147924830957442272',
// iat: 1676849347,
// exp: 1679441347,
// jti: '0a9b2cf4-2e8f-4a89-b068-cbc9a828ce6c'

//var SCOPES = "https://accounts.google.com/o/oauth2/auth";
 // https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token
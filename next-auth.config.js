import GoogleProvider from 'next-auth/providers/google'
import axios from 'react-axios'
// module.exports = {
//     // Путь к эндпоинту аутентификации
//     basePath: "/pages/auth",
//     // Другие настройки NextAuth.js
//     // ...
//   };

  module.exports = {
    debug: true,
    providers: [
      GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     authorizationUrl:   process.env.AUTORIZATION_URL,
    // //    scope:  process.env.SCOPES,
    //     redirect_uri:process.env.REDIRECT_URL,
  
        // id: 'my-backend-api',
        // name: 'My Backend API',
        // type: 'oauth',
        // version: '2.0',
        
        // clientId:  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        // clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        // callbackURL: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
        // authorization: {
        //   params: {
        //     prompt: "consent",
        //     access_type: "offline",
        //     response_type: "code"
        //   }
        // },

        // authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        // scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        // callbackUrl: 'http://localhost:8093/api/auth/callback/google',
        // userinfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
        // authorizationParams: {
        //   audience: 'https://www.googleapis.com/oauth2/v4/token',
        //   access_type: 'offline',
        // },
      //   authorizationUrl:  "http://localhost:3000/api/auth/signin",
    //    scope:  process.env.SCOPES,
     //   redirect_uri:"http://localhost:3000/api/auth/callback/google",
    //    requestTokenUrl:"http://localhost:3000/",
  
  



    clientId:  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    authorizationUrl:
      "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly",
    accessTokenUrl: "https://oauth2.googleapis.com/token",
    profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    },

    
    profile: (profile) => {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },

          pages: {
            signIn: "/page0s/auth/signin",
            signOut: "/pag0es/auth/signout",
            error: "/pag0es/auth/error", 
            // Другие настройки NextAuth.js
            // ...
            session: "http://localhost:8093/pageaas/auth/session",
          }
      }),
    ],
    // Путь к API эндпоинту аутентификации
    // pages: {
    //   signIn: "/page0s/auth/signin",
    //   signOut: "/pag0es/auth/signout",
    //   error: "/pag0es/auth/error", 
    //   // Другие настройки NextAuth.js
    //   // ...
    //   session: "http://localhost:8093/pages/auth/session",
    // },
    jwt: {
      token: process.env.NEXT_PUBLIC_SECRET,
      // The maximum age of the NextAuth.js issued JWT in seconds.
      // Defaults to `session.maxAge`.
      maxAge: 60 * 60 * 24 * 30
    },

    secret: "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",

    callbacks: {
      async signIn({ user, account, profile, email, credentials,}) {
      //   console.log('========================================================================='); 
   
      // //  console.log( user, account, profile, email, credentials );
      //   console.log( ' user ',user  );
      //   console.log( ' account ',account  );
      //   console.log( 'email ',email  );
      //   console.log( 'profile ',profile);
      //   console.log( 'credentials ',credentials); 
        return true
      },
      async redirect({ url, baseUrl }) {
        // console.log('url',url);
        // console.log('baseUrl ',baseUrl );
        return baseUrl
      },
      async session({ session, user, token }) {
        if (!session?.user) {
          return session;
        }
  

  //       const res = await axios.get(`/api/user/${user.id}`);
  //       const userData = res.data;
    
  //       // Add the user data to the session object
  //       session.user = { ...session.user, ...userData };
  //       return session;


  
  //       console.log('callbacks: session',session); 
  //       console.log('callbacks: user',user);
  //       console.log('callbacks: token',token);
  // //      return session
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
  
    // session: {
       
    //  //  strategy: "database",
    //   strategy: "jwt",
    //   maxAge: 3000,
    //   generateSessionToken: () => {
    //     return randomUUID?.() ?? randomBytes(32).toString("hex")
    //   }
    // },
  };
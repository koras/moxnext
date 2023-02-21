 
// import {
  import React, { useState, useEffect } from 'react';
//   Link
// } from "react-router-dom";
import { GoogleLogin,GoogleLogout } from 'react-google-login';

import GoogleProvider from "next-auth/providers/google";
import { useSession, signIn, signOut } from 'next-auth/react';
//import { gapi } from 'gapi-script';
//import { useNavigate } from "react-router-dom";

//import Button from '@mui/material-next/Button';

import style  from './styleHead.module.css';
   


const iconGoogle = <svg aria-hidden="true" className="native svg-icon iconGoogle" width="18" height="18" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z" fill="#4285F4"></path><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z" fill="#34A853"></path><path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z" fill="#FBBC05"></path><path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z" fill="#EA4335"></path></svg>

const clientId = '854331110586-ams6lqojo4dc3buer6ia5ov7jtjo92ca.apps.googleusercontent.com';
const  ClientSecret = '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';
var SCOPES = "https://accounts.google.com/o/oauth2/auth";
 // https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token
 export default () => {

  //const navigate = useNavigate(); 
  const { data: session } = useSession()
  

  // providers: [
  //   GoogleProvider({
  //     clientId: clientId,
  //     clientSecret: ClientSecret,
  //     authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
  
  //   })
  // ]


  const [ profile, setProfile ] = useState([]);
//   useEffect(() => {
//     const initClient = () => {
//           gapi.client.init({
//           clientId: clientId,
//        //   scope: SCOPES
//         });
//      };
//      gapi.load('client:auth2', initClient);
//  });

   const onSuccess = (res) => {
  //  console.log('onSuccess', res);
        setProfile(res.profileObj);
    };

    const onFailure = (err) => {
      //  console.log('failed', err);
    };

    const logOut = () => {
      setProfile(null);
  };
  const customStyle = {
        width:100,
        height:50,
        margin:'20px',
        boxShadow:'0px'
  };

  const toProfile=()=> {
    
   // navigate("/profile" );
  }
     
//  if(profile && profile.name status === 'authenticated'){
const  GetProfile =()=> { 

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
  if( status === 'authenticated'){
    // console.log('user image',profile);
    // return  <div className={style.profileBox} >
    //         <div  onClick={toProfile} className={style.moexButtonProfile}> Кабинет (0)</div>   
    //         <GoogleLogout clientId={clientId} 
    //              render={renderProps => (
    //               <div className={style.profileBox}> 
    //                 <div    
    //                 type="submit"
    //                 color="primary"
    //                 className={style.authGoogle}
    //                 onClick={renderProps.onClick}
    //               >
    //                 {iconGoogle}
    //                <span>Выйти</span>
    //                </div> 
    //                </div>
    //             )}
    //         className={customStyle}

           
    //         onLogoutSuccess={logOut} />
  
    //     </div>
    // } else {
    //   return <div><GoogleLogin
    //           render={renderProps => (
    //              <div    
    //               type="submit" 
    //               color="primary"
    //               className={style.authGoogle}
    //               onClick={renderProps.onClick}
    //             >
    //               {iconGoogle}
    //              <span>Войти в профиль</span>
    //           </div>
    //           )}
    //         clientId={clientId}
    //         buttonText="Войти " 
    //         onSuccess={onSuccess}
    //         onFailure={onFailure}
    //         cookiePolicy={'single_host_origin'}
    //         isSignedIn={true}
    //     /></div>
     }
}

return (
  <div className={style.headerBoxLk}> 
  <div className={style.headerBoxLk__light}>  
      <div className={style.headerBoxLk__input}> {<GetProfile/>}</div>
  </div> 
 </div> 
 
)

}
 

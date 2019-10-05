const Gauth = (gapi, onSignIn, onSignOut) => {
  const updateSignIn = (signedIn) => {
    if (signedIn) onSignIn();
    else onSignOut();
  };

  const signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignIn);
  updateSignIn(gapi.auth2.getAuthInstance().isSignedIn.get());

  return {
    signIn,
    signOut,
  };
};

export default Gauth;

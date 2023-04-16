let auth0Client = null;

const fetchAuthConfig = async () => {
  try {
    const response = await fetch("config/auth_config.json")
    const config = await response.json();
    return config;
  } catch (error) {
    console.error(error);
  }
};


const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId
  });
};


  const updateUI = async () => {
    console.log("updateUI called");
    const isAuthenticated = await auth0Client.isAuthenticated();
    console.log("isAuthenticated:", isAuthenticated);

  document.getElementById("btn-login").disabled = !isAuthenticated;
  document.getElementById("btn-logout").disabled = isAuthenticated;

  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    document.getElementById("gated-content").classList.remove("hidden");

    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0Client.getTokenSilently();

    document.getElementById("ipt-user-profile").textContent = JSON.stringify(
      await auth0Client.getUser()
    );
  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }
};

const login = async () => {
  if (!auth0Client) {
    return;
  }

  await auth0Client.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};



const logout = async () => {
  if (auth0Client) {
    await auth0Client.logout({
      returnTo: window.location.origin
    });
  }
};

if (typeof window !== "undefined") {
  window.onload = async () => {

  // .. code ommited for brevity

  updateUI();

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    // show the gated content
    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0Client.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

document.getElementById("btn-login").addEventListener("click", async () => {
  await login();
});

document.getElementById("btn-logout").addEventListener("click", async () => {
  await logout();
});
}


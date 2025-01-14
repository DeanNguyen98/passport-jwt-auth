const Protected = () => {
    const token = localStorage.getItem("token"); // Check if the token exists
  
    return (
      <div>
        {token ? (
          <h1>You are in the protected route</h1>
        ) : (
          <h1>You are not logged in</h1>
        )}
      </div>
    );
  };

  export default Protected;

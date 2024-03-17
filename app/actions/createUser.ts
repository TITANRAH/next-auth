export const createUser = async (data: any) => {

    console.log('data desde action create User', data);
    
    try {
      const result = await fetch("../api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // dio problemas enviar elconfirmPassword por que ese dato no esta en el model en base de datos 
        // por lo que preferi enviar el body asi y validar que el password y el confirm eran iguales en 
        // la page en el onsbumit
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password
        }),
      })

    //   puedo enviar el json o el response.ok que es parte de Response
    //   const response = await result.json();
      const response = result;
      return response;
    } catch (error) {
      let errorMessage = 'An error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(`Error fetching data: ${error}`,)
    }
  }
  
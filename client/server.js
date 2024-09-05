

      const mp = new MercadoPago('TEST-39c031a0-720d-4e02-b7a5-df95cd043074', {
        locale: 'es-CO'
      });

      
      
      document.querySelector("#btn-mp").addEventListener("click", async () => {

        try{
          const orderData = {
            title: 'My product',
            quantity: 1,
            unit_price: 5000
          }
  
          const response  = await fetch ("http://localhost:3000/create_preference", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
  
          })
  
          const preference = await response.json();
          createCheckoutButton(preference.id)

        }catch(error){
          alert("error")
        }
        
      })

      const createCheckoutButton = (preferenceId)=> {
        const bricksBuilder = mp.bricks();

        const renderComponet = async () => {

          if (window.CheckoutButton) window.CheckoutButton.unmount();
          
          await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
         });

        }

        renderComponet()
      }

    

        
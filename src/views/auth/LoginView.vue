<script setup></script>
<template>
    <main class="main-auth">
        <section class="container-auth">
            <section class="container-art-auth">
                <img src="../../assets/images//monn.jpg" alt="moon art">
            </section>
            <section class="container-form-auth">

                <div class="box-form">
                    <h1>Iniciar Sessão</h1>

                    <div class="box-inputs">
                        <div class="inputs-login">
                            <p>Email</p>
                            <input type="text">
                        </div>
                        <div class="inputs-login">
                            <p>Password</p>
                            <input type="text">
                        </div>
                        <div class="inputs-login">
                            <p>Confirm Password</p>
                            <input type="text">
                        </div>

                        <div class="box-help-login">
                        <p>Forgot Password</p>
                        <RouterLink to="/sign-up"><p>Register</p></RouterLink>
                    </div>
                    </div>

                   

                    <div class="box-button">
                        <button>Iniciar Sessão</button>
                    </div>
                </div>


                
            </section>
        </section>
    </main>
</template>
<style scoped>
* {
    font-family: var(--font-poppins)
}
.main-auth {
    height: auto;
    width: 100%;
}

.container-auth {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.container-art-auth {
    width: 40%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
        width: 70%;
        border-radius: 10px;
        height: 60%;
    }
}

.container-form-auth {
    width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.box-form {
    width: 500px;
    height: 600px;
    background-color: #121212;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;

    & h1 {
        font-size: 30px;
        margin-top: 10px;
        color: white;
        font-weight: 600;
    } 
    
    .box-inputs {
        width: 90%;
        height: 55%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 30px;
    }

    .inputs-login {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        & p {
            font-size: 17px;
            color: #6340AE;
            position: absolute;
            left: 30px;
            top: 5px;
            background-color: #121212;
            padding: 1px 5px;
            border-radius: 10px;
        }

        & input {
            height:60%;
            width: 90%;
            background-color: transparent;
            border: solid #222222 2px;
            border-radius: 10px;
            padding: 12px;
            color: white;
        }
    }
}

.box-help-login {
    display: flex;
    justify-content: space-around;
    width: 100%;
    color: #6340AE;
    
    & p {
        cursor: pointer;
        &:hover {
        color: #7956c4;
    }
    }
}

.box-button {
    width: 90%;
    height: 8%;
    margin-bottom: 10px;
    & button {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: none;
        color: white;
        font-size: 22px;
        background-color: #6340AE;
        cursor: pointer;
        &:hover {
            background-color: #543b8b;
        }
    }
}
</style>
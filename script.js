class dataHora {

    constructor() {
        this.agora = '';
        this.minute = '';

        this.getDataAtual();
        setInterval(this.getDataAtual.bind(this), 1000); 

        this.atualizarHora();
        this.atualizarData();
        this.atualizarSaudacao();
        this.atualizarClima();
    }

    getDataAtual() {
        this.agora = new Date();

        if(this.minute == '') {
            this.minute = this.agora.getMinutes()
        } else {
            if(this.agora.getMinutes() != this.minute) {
                this.minute = this.agora.getMinutes()
                this.atualizarHora();
            }
        }
    }

    atualizarHora() {
        let horas = this.agora.getHours().toString().padStart(2, '0');
        let minutos = this.agora.getMinutes().toString().padStart(2, '0');
        document.getElementById("hora").innerText = `${horas}:${minutos}`;
    }

    atualizarData() {
        const diasDaSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
        const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        const diaDaSemana = diasDaSemana[this.agora.getDay()];
        const diaDoMes = this.agora.getDate();
        const mes = meses[this.agora.getMonth()].toLowerCase();
        const ano = this.agora.getFullYear();
        document.getElementById("dia").innerText = `${diaDaSemana}, ${diaDoMes} de ${mes} de ${ano}`;
    }

    atualizarSaudacao() {
        let horas = this.agora.getHours();
        let saudacao = '';
        const user_name = 'Rian';

        
        if (horas >= 6 && horas <= 12)  {
            saudacao = `Bom dia, ${user_name}`;
        }
        else if (horas >= 13 && horas <= 18)  {
            saudacao = `Boa tarde, ${user_name}`;
        }
        else if ((horas >= 19 && horas <= 23) || (horas >= 0 && horas <= 5)) {
            saudacao = `Boa noite, ${user_name}`;
        }

        document.getElementById("salute").innerText = saudacao;

    }

    async getClimaAtual() {
        const apiKey = "c48d97cd1032cbacf0f20cc5292a985c";
        const lat = '-27.9499376';
        const lon = '-51.8074435';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao buscar os dados");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro:", error);
            return null;
        }
    }
    

    async getPrevisaoProximasHoras() {
        const apiKey = "c48d97cd1032cbacf0f20cc5292a985c";
        const lat = '-27.9499376';
        const lon = '-51.8074435';
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao buscar a previsão");
            }
            const data = await response.json();
            

            const primeiraPrevisao = data.list[0];
            const descricaoPrevisao = (primeiraPrevisao.weather[0].description);
            const temperaturaPrevisao = Math.round(primeiraPrevisao.main.temp);
    
            return { descricaoPrevisao, temperaturaPrevisao };
        } catch (error) {
            console.error("Erro na previsão:", error);
            return null;
        }
    }
    

    async atualizarClima() {
        const climaAtual = await this.getClimaAtual();
        const previsao = await this.getPrevisaoProximasHoras();
    
        if (climaAtual && previsao) {
            const icone = climaAtual.weather[0].icon;
            const descricaoAtual = this.capitalizarPrimeiraLetra(climaAtual.weather[0].description);
            
            const temperaturaAtual = Math.round(climaAtual.main.temp);
            
            document.getElementById('icone').src = `https://openweathermap.org/img/wn/${icone}@2x.png`;
            document.getElementById('temp').innerText = `${temperaturaAtual}º`;
            document.getElementById('clima').innerHTML = `
                ${descricaoAtual}. Atualmente faz ${temperaturaAtual}ºC <br>
                Para as próximas horas, o clima será de ${previsao.descricaoPrevisao}.
            `;
            document.querySelector(".container").style.display = "block"; 
        }
    }

    async buscarImagem(query) {
        const horaAtual = new Date().getHours();
        const ultimaHora = localStorage.getItem("ultimaHora");
    

        if (!ultimaHora || ultimaHora != horaAtual) {
            const url = `https://api.unsplash.com/photos/random?query=nature&client_id=SUA_CHAVE_AQUI`;
    
            try {
                const resposta = await fetch(url);
                const dados = await resposta.json();
                const imagemUrl = dados.urls.full;
    
                localStorage.setItem("imagemUnsplash", imagemUrl);
                localStorage.setItem("ultimaHora", horaAtual);
                document.main.style.backgroundImage = `url(${imagemUrl})`;
            } catch (erro) {
                console.error("Erro ao buscar imagem do Unsplash", erro);
            }
        } else {
            // Se a hora for a mesma, usa a imagem já armazenada
            document.main.style.backgroundImage = `url(${localStorage.getItem("imagemUnsplash")})`;
        }
    }
    

    capitalizarPrimeiraLetra(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

        



        
    


}


document.addEventListener("DOMContentLoaded", () => {
    const layout = new dataHora();
});
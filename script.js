class dataHora {

    constructor() {
        this.agora = '';
        this.minute = '';
        this.hour = '';

        this.getDataAtual();
        setInterval(this.getDataAtual.bind(this), 1000); 

        this.atualizarHora();
        this.atualizarData();
        this.atualizarSaudacao();
        this.atualizarClima();
        this.buscarFeriado();
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
        if(this.hour == '') {
            this.hour = this.agora.getHours();
        } else {
            if(this.agora.getHours() != this.hour) {
                this.hour = this.agora.getHours()
                this.atualizarSaudacao();
                this.atualizarClima();
                this.atualizarTitulo();
                this.buscarImagem();
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
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt&cnt=1`;

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
        try {
            const [climaAtual, previsao] = await Promise.all([
                this.getClimaAtual(),
                this.getPrevisaoProximasHoras()
            ]);
    
            if (!climaAtual || !previsao) return;
    
            const { icon, description } = climaAtual.weather[0];
            const descricaoAtual = this.capitalizarPrimeiraLetra(description);
            const temperaturaAtual = Math.round(climaAtual.main.temp);
            const descricaoPrevisao = previsao.descricaoPrevisao.toLowerCase();
    
            document.getElementById('icone').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById('temp').innerText = `${temperaturaAtual}º`;
    
            let ocorrencia = 'será de';
            const ocorrenciasEspeciais = ['nublado'];
    
            if (ocorrenciasEspeciais.includes(descricaoPrevisao)) {
                ocorrencia = 'estará';
            }
    
            if (descricaoAtual.toLowerCase() === descricaoPrevisao) {
                ocorrencia = ocorrencia === 'estará' ? 'permanecerá' : 'permanecerá com';
            }
    
            document.getElementById('clima').innerHTML = `
                ${descricaoAtual}. Atualmente faz ${temperaturaAtual}ºC <br>
                Para as próximas horas, o clima ${ocorrencia} ${previsao.descricaoPrevisao}.
            `;
    
            document.querySelector(".container").style.display = "block";
            this.buscarImagem();
        } catch (error) {
            console.error("Erro ao atualizar o clima:", error);
        }
    }

    async buscarImagem() {
        try {
            const horaAtual = this.agora.getHours();
            const ultimaHora = localStorage.getItem("ultimaHora");
            const key = 'd0jLuZNi4lsVcYgvT43daJAVz4zWoKGgEky870rKuSk';
    
            // Se a imagem já foi carregada na mesma hora, usa a armazenada
            if (ultimaHora && ultimaHora == horaAtual) {
                return this.aplicarImagemDeFundo(localStorage.getItem("imagemUnsplash"));
            }
    
            const keywords = [
                "night", "river", "city", "mountain", "sunset", "forest", "ocean", "desert",
                "stars", "skyline", "mist", "sunrise", "waterfall", "beach", "valley", 
                "lake", "nebula", "canyon", "aurora", "clouds", "moonlight", "island", 
                "rain", "snow", "autumn", "spring", "winter", "summer", "galaxy", 
                "tropical", "village", "landscape", "horizon", "panorama", "reflection", 
                "wildlife", "waves", "glacier", "volcano", "meadow", "field", "cliff", 
                "countryside", "path", "garden", "bamboo", "palm trees", "coral reef", 
                "castle", "bridge", "harbor", "sky", "dusk", "dawn", "highway", "street", 
                "alley", "tower", "lighthouse", "cave", "temple", "zen", "peaceful", 
                "majestic", "dreamy", "mystical", "colorful"
            ];
    
            const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
            console.log(randomKeyword)
            const url = `https://api.unsplash.com/photos/random?query=${randomKeyword}&orientation=landscape&client_id=${key}`;
    
            const resposta = await fetch(url);
            if (!resposta.ok) throw new Error(`Erro na requisição: ${resposta.status}`);
    
            const dados = await resposta.json();
            const imagemUrl = dados.urls?.regular;
    
            if (imagemUrl) {
                localStorage.setItem("imagemUnsplash", imagemUrl);
                localStorage.setItem("ultimaHora", horaAtual);
                this.aplicarImagemDeFundo(imagemUrl);
            }
        } catch (erro) {
            console.error("Erro ao buscar imagem do Unsplash:", erro);
        }
    }
    
    aplicarImagemDeFundo(imagemUrl) {
        if (!imagemUrl) return;
        
        const main = document.getElementById('main');
        main.style.background = `url('${imagemUrl}') no-repeat center/cover`;
        
        document.getElementById('loading').style.display = "none";
    }
    

    async buscarFeriado() {
        const diaArmazenado = localStorage.getItem("diaArmazenado");
        const key = '17777|cRw5Blk4OtiBXPBwLLCn0bIEh1JwcCOA';
        const ano = this.agora.getFullYear();
        const diaDoMes = this.agora.getDate();

        if (!diaArmazenado || diaArmazenado != diaDoMes) {
              
            const url = `https://api.invertexto.com/v1/holidays/${ano}?token=${key}&state=RS`;
    
            try {
                const resposta = await fetch(url);
                const dados = await resposta.json();
                const dataHoje = this.agora.toISOString().split('T')[0]; // Formato yyyy-mm-dd

                dados.forEach(dados => {
                if (dados.date === dataHoje) {
                    const feriadoNome = dados.name
                    localStorage.setItem("feriadoHoje", feriadoNome);
                    document.getElementById('feriado').innerText = feriadoNome

                }
                });

                localStorage.setItem("diaArmazenado", diaDoMes);

            } catch (erro) {
                console.error("Erro ao buscar feriados", erro);
            }
        } else {
            const feriado = localStorage.getItem("feriadoHoje");
            document.getElementById('feriado').innerText = feriado
        }
    }

    atualizarTitulo() {
        let hora = new Date().getHours();
        let titulo;

        if (hora >= 5 && hora < 12) {
            titulo = "good morning☕️";
        } else if (hora >= 12 && hora < 18) {
            titulo = "good afternoon☀️";
        } else {
            titulo = "good night🌃";
        }
        document.title = titulo;
    }


    capitalizarPrimeiraLetra(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

        



        
    


}


document.addEventListener("DOMContentLoaded", () => {
    const layout = new dataHora();
});
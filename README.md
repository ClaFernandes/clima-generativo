# 🌦️ Clima Generativo

Um app React que busca o clima real de uma cidade e transforma os dados em
uma cena SVG animada: céu que muda de cor conforme a hora do dia, sol ou lua
posicionados, nuvens que se movem conforme a velocidade do vento, chuva, neve
e relâmpagos condicionais.

## ✨ Funcionalidades

- Busca de clima por nome de cidade
- Geolocalização automática ao abrir o app (com fallback pra busca manual)
- Toggle de unidade °C / °F
- Tema claro/escuro ("observatório" e "caderno de campo"), sem afetar a cena
- Cena generativa em SVG que muda conforme:
  - Fase do dia (amanhecer, dia, entardecer, noite)
  - Condição climática (limpo, nublado, chuva, neve, tempestade, névoa)
  - Velocidade do vento (afeta a velocidade da animação das nuvens)
- Estados de loading e erro tratados (cidade não encontrada, falha de rede, etc.)
- Totalmente responsivo

## 🛠️ Tecnologias

- React
- Vite
- CSS puro (sem frameworks de UI ou animação)
- [OpenWeatherMap API](https://openweathermap.org/api)

## 🚀 Rodando localmente

```bash
# clona o repositório
git clone <url-do-seu-repositorio>
cd clima-generativo

# instala as dependências
npm install

# configura a chave da API: crie um arquivo .env na raiz do projeto
# com a seguinte linha (pegue sua chave em openweathermap.org):
# VITE_OPENWEATHER_API_KEY=sua_chave_aqui

# roda o servidor de desenvolvimento
npm run dev
```

O terminal vai mostrar um endereço tipo `http://localhost:5173`.

## 📁 Estrutura do projeto

```
src/
  components/
    SearchBar.jsx        → input + botão de busca
    WeatherInfo.jsx       → card com cidade, temperatura e descrição
    WeatherScene.jsx       → a cena SVG animada (o coração visual do projeto)
    UnitToggle.jsx          → alternância entre °C e °F
    StatusMessages.jsx       → loading, erro e estado vazio
  hooks/
    useWeather.js            → lógica de chamada à API (por cidade ou coordenadas)
    useGeolocation.js          → geolocalização automática do navegador
  utils/
    weatherToScene.js           → traduz os dados da API em parâmetros visuais
  App.jsx                        → junta tudo
  App.css                        → design tokens e layout
```

import promptSync from "prompt-sync";
import fetch from "node-fetch";

const prompt = promptSync();

const cityName = prompt("Digite o nome da cidade: ");
const stateName = prompt("Digite o UF do estado: ").toUpperCase();
const streetName = prompt("Digite o nome da rua: ");

async function search(uf, city, street) {
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${uf}/${encodeURIComponent(
        city
      )}/${encodeURIComponent(street)}/json/`
    );
    if (!response.ok) throw new Error("Cidade não encontrada");
    const data = await response.json();

    if (data.erro) {
      if (!Array.isArray(data) || data.length === 0 || data.erro) return null;
    }
    return data;
  } catch {
    return null;
  }
}

async function main() {
  const results = await search(stateName, cityName, streetName);
  if (results && results.length > 0) {
    const endereco = results[0];
    console.log("\n-------------------------");
    console.log(`CEP: ${endereco.cep}`);
    console.log(`Cidade: ${endereco.localidade}`);
    console.log(`UF: ${endereco.uf}`);
    console.log(`Estado: ${endereco.estado}`);
    console.log(`DDD: ${endereco.ddd}`);
    console.log("-------------------------");
  } else {
    console.log("\n-------------------------");
    console.log("Nenhum endereço encontrado.");
    console.log("-------------------------");
  }
}

main();

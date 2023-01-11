import React, { useEffect, useState } from 'react';


function Haku() {
    const [name, setnimi] = useState("")
    const [add, setosoite] = useState("")
    const [asiakas, setAsiakas] = useState([]);
    

    useEffect(() => {
        fetchData();
    })


    async function fetchData() {  // Pistä tämä komento kun olet databasen kansiossa cmd:llä 
        // json-server --watch db.json --port 3004 --delay 2000



        let response = "";
        if (name === "" && add === "") {
            response = await fetch("http://localhost:3004/henkilot");
        }
        else {

            response = await fetch("http://localhost:3004/henkilot" + "?nimi_like=" + name + "&osoite_like=" + add);
        }

        let data = await response.json();

        if (data.length > 0) {
            console.log(data)


            setAsiakas(data)



        }

        else {setAsiakas([])}

    }




    function renderTableData() {

        return asiakas.map((data) => {
            const { nimi, osoite, postinumero, postitoimipaikka, puhelinnumero } = data //destructuring
            return (
                <tr>
                    <td>{nimi}</td>
                    <td>{osoite}</td>
                    <td>{postinumero}</td>
                    <td>{postitoimipaikka}</td>
                    <td>{puhelinnumero}</td>


                </tr>
            )
        })
    }



    if (asiakas.length > 0)
        return (
            <div>

                <h4>asiakas haku</h4>
                <form>
                    <label for="asiakas nimi">Nimi</label>
                    <input type="text" onChange={(e) => setnimi(e.target.value)}></input>
                    <label for="asiakas osoite">Osoite</label>
                    <input type="text" onChange={(e) => setosoite(e.target.value)}></input>
                </form>
                <button onClick={fetchData}>Hae</button>
                {asiakas.length > 0 ?
                    <table>
                        <tr>
                            <th>
                                Nimi
                        </th>
                            <th>
                                Osoite
                        </th>
                            <th>
                                Postinumero
                        </th>
                            <th>
                                Postitoimipaikka
                        </th>
                            <th>
                                Puh.
                        </th>
                        </tr>
                        {renderTableData()}
                    </table>
                    : <p>Annetuilla hakuehdoilla ei löytynyt dataa</p>
                }

            </div>

        )
    else {
        return (<div>Loading...</div>)
    }
}


export default Haku;
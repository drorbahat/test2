$(() => {

    $('#load-all-countries-btn').click((e) => {
        e.preventDefault()
        $.ajax({
            url: "https://restcountries.com/v3.1/all",
            success: result => {
                loadStats(result)
            }
        })
    })

    $('#search-by-name-btn').click((e) => {
        e.preventDefault()
        let selectedName = $('#search-by-name-input').val()
        $.ajax({
            url: `https://restcountries.com/v3.1/name/${selectedName}`,
            success: result => {
                loadStats(result)
            }
        })
    })

    const loadStats = (countries) => {

        let statsContainer = $('#stats-container')
        statsContainer.empty()

        let nameCitizensTbody = $("#name-num-of-citizens-table-body")
        nameCitizensTbody.empty()

        let regionCountriesTbody = $("#region-num-of-countries-table-body")
        regionCountriesTbody.empty()

        let nameCitizensRows = ''
        let regionCountriesRows = ''

        let totalCoutriesSum = 0
        let totalPopulation = 0
        let avgPopulation = 0

        let counterAfrica = 0
        let counterAmericas = 0
        let counterAsia = 0
        let counterEurope = 0
        let counterOceania = 0

        let regionArr = []

        countries.forEach(element => {
            totalCoutriesSum++
            totalPopulation += element.population

            nameCitizensRows += `
            <tr>
                <td>
                    ${element.name.common}
                </td>
                <td>
                    ${element.population}
                </td>
            </tr>
            `
            if (element.region === "Africa") {
                counterAfrica++
            } else if (element.region === "Americas") {
                counterAmericas++
            } else if (element.region === "Asia") {
                counterAsia++
            } else if (element.region === "Europe") {
                counterEurope++
            } else if (element.region === "Oceania") {
                counterOceania++
            }

            regionArr.push(element.region)



        });
        avgPopulation = totalPopulation / totalCoutriesSum

        console.log(regionArr)
        let counts = {}
        regionArr.forEach((x) => {
            counts[x] = (counts[x] || 0) + 1
        })
        console.log(counts)

        regionCountriesRows += `
        <tr>
            <td>
                Africa
            </td>
            <td>
                ${counterAfrica}
            </td>
        </tr>
        <tr>
            <td>
                Americas
            </td>
            <td>
                ${counterAmericas}
            </td>
        </tr>
        <tr>
            <td>
                Asia
            </td>
            <td>
                ${counterAsia}
            </td>
        </tr>
        <tr>
            <td>
                Europe
            </td>
            <td>
                ${counterEurope}
            </td>
        </tr>
        <tr>
            <td>
                Oceania
            </td>
            <td>
                ${counterOceania}
            </td>
        </tr>
        `

        statsContainer.append(`
        <p>Total countries result: ${totalCoutriesSum}</p>
        <p>Total Countries Population: ${totalPopulation} </p>
        <p>Average Population: ${avgPopulation}</p>
        `);

        nameCitizensTbody.append(nameCitizensRows)
        regionCountriesTbody.append(regionCountriesRows)

    }
})
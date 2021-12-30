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

        let currencyCountriesTbody = $("#currency-num-of-countries-table-body")
        currencyCountriesTbody.empty()

        let nameCitizensRows = ''
        let regionCountriesRows = ''
        let currencyCountriesRows = ''

        let totalCoutriesSum = 0
        let totalPopulation = 0
        let avgPopulation = 0

        let regionArr = []
        let currencyArr = []


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

            regionArr.push(element.region)

            currencyArr.push(Object.keys(!element.currencies ? '' : element.currencies))

        })


        avgPopulation = totalPopulation / totalCoutriesSum

        let regionsObj = {}
        let currenciesObj = {}

        regionArr.forEach((x) => {
            regionsObj[x] = (regionsObj[x] || 0) + 1
        })

        currencyArr.forEach((x) => {
            currenciesObj[x] = (currenciesObj[x] || 0) + 1
        })

        for (const key in regionsObj) {
            regionCountriesRows += `
            <tr>
                <td>
                    ${key}
                </td>
                <td>
                    ${regionsObj[key]}
                </td>
            </tr>
            `
        }

        for (const key in currenciesObj) {
            currencyCountriesRows += `
            <tr>
                <td>
                    ${key}
                </td>
                <td>
                    ${currenciesObj[key]}
                </td>
            </tr>
            `
        }

        statsContainer.append(`
        <p>Total countries result: ${totalCoutriesSum}</p>
        <p>Total Countries Population: ${totalPopulation} </p>
        <p>Average Population: ${avgPopulation}</p>
        `);

        nameCitizensTbody.append(nameCitizensRows)
        regionCountriesTbody.append(regionCountriesRows)
        currencyCountriesTbody.append(currencyCountriesRows)
    }

})
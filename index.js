const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const write_data = async (toCard, amount, fromCard,cvv, expireDate, email) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 984 })
    await page.goto('https://qiwi.com/payment/form/31873')

    await page.waitForSelector('.center-loader-content-342 > .block-content-self-309 > .block-content-content-311 > div > .na-source-active-366')
    await page.click('.center-loader-content-342 > .block-content-self-309 > .block-content-content-311 > div > .na-source-active-366')

    await page.waitForSelector('div > .field-self-267 > .mask-text-input-form-field-self-268 > .mask-text-input-form-field-input-275 > .mask-text-input-form-field-input-control-self-280')
    await page.type('div > .field-self-267 > .mask-text-input-form-field-self-268 > .mask-text-input-form-field-input-275 > .mask-text-input-form-field-input-control-self-280', toCard)
    
    await page.waitForSelector('.block-content-content-249 > .amount-self-293 > .mask-text-input-form-field-self-268 > .mask-text-input-form-field-input-275 > .mask-text-input-form-field-input-control-self-280')
    await page.type('.block-content-content-249 > .amount-self-293 > .mask-text-input-form-field-self-268 > .mask-text-input-form-field-input-275 > .mask-text-input-form-field-input-control-self-280', amount)

    await page.waitForSelector('.payment-card-self-300 > .payment-card-pan-304 > .mask-text-input-form-field-self-226 > .mask-text-input-form-field-input-233 > .mask-text-input-form-field-input-control-self-238')
    await page.type('.payment-card-self-300 > .payment-card-pan-304 > .mask-text-input-form-field-self-226 > .mask-text-input-form-field-input-233 > .mask-text-input-form-field-input-control-self-238', fromCard)

    await page.waitForSelector('.payment-card-self-300 > .payment-card-date-305 > .mask-text-input-form-field-self-226 > .mask-text-input-form-field-input-233 > .mask-text-input-form-field-input-control-self-238')
    await page.type('.payment-card-self-300 > .payment-card-date-305 > .mask-text-input-form-field-self-226 > .mask-text-input-form-field-input-233 > .mask-text-input-form-field-input-control-self-238', expireDate)

    await page.waitForSelector('.payment-card-cvv-306 > .hidden-text-input-form-field-hidden-text-322 > .hidden-text-input-form-field-self-307 > .hidden-text-input-form-field-input-314 > .hidden-text-input-form-field-input-control-self-319')
    await page.type('.payment-card-cvv-306 > .hidden-text-input-form-field-hidden-text-322 > .hidden-text-input-form-field-self-307 > .hidden-text-input-form-field-input-314 > .hidden-text-input-form-field-input-control-self-319', cvv)

    await page.waitForSelector('.block-content-self-205 > .block-content-content-207 > .text-input-form-field-self-324 > .text-input-form-field-input-331 > .text-input-form-field-input-control-self-336')
    await page.type('.block-content-self-205 > .block-content-content-207 > .text-input-form-field-self-324 > .text-input-form-field-input-331 > .text-input-form-field-input-control-self-336', email)

    await page.waitForSelector('.block-content-content-243 > .submit-self-314 > .submit-button-315 > .button-self-29 > .button-content-42')
    await page.click('.block-content-content-243 > .submit-self-314 > .submit-button-315 > .button-self-29 > .button-content-42')
    console.log(1)
    if(!await page.waitForSelector('.mainer-content-159 > .content-self-76 > .content-column-self-77 > .block-self-235 > .block-content-accented-245')) {
        throw new Error('err')
    }
    await browser.close()
}

write_data('5469310022724856', '10', '4441114431027984', '452', '1024', 'my.tentacles.are.in.you@gmail.com')
app.post('/sendData',async (req, res) => {
    try {
        const {returnURL, toCard,amount, fromCard, cvv, expireDate, email} = req.body
        console.log(1)
        await write_data(toCard,amount, fromCard, cvv, expireDate, email)
        return res.redirect(returnURL)
    } catch (e) {
        return res.send(e)
    }
})

app.listen(5000)

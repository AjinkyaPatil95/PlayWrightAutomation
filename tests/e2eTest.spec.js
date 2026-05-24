
import {expect, test} from '@playwright/test';

test.only('Practice test', async ({ page }) => {
    const email= 'ajinkyapatil5@gmail.com';
    const pass= 'Radha@1008'
    const cont= '8421065995'
    const name= 'Ajinkya'
    const Lname= 'Patil'
    const opt= '2: Student'
    const productName= "ZARA COAT 3";
    const username= page.locator('#userEmail');
    const dropDown= page.locator('[formcontrolname="occupation"]');
    const accessKey= page.locator('#userPassword');
    const products= page.locator('.card-body');
    const cardmonth= await page.locator('select').first();
    const cardyear= await page.locator('select').last();
    const cardDetails = await page.locator('.text-validated').first();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill(email);
    await accessKey.fill(pass);
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();
    const title = await page.locator('.card-body b').allTextContents();
    console.log(title);
    const count= await products.count();
    for (let i = 0; i < count; i++){
        if (await products.nth(i).locator('b').textContent() === productName )
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    // await page.pause();

    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text = Checkout").click();  

    cardDetails.clear();
    cardDetails.fill('1234 8465 4567 8908');
    cardmonth.waitFor();
    cardmonth.selectOption("08");
    cardyear.selectOption("30");
    await page.locator("input.input").nth(1).fill('1234');
    await page.locator("input.input").nth(2).fill('Radhavallabh');
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay:150 })
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor();
    const optioncount = await dropdown.locator("button").count();
    for (let i = 0; i < optioncount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log(text);
        if( text === " India"){ 
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const newOrderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(newOrderID);

    await page.locator("button[routerlink*='myorder']").click();
    await page.locator('.table').waitFor();
    const row = await page.locator('.table tr');

    for(let i=0; i< await row.count(); i++){
        const rowOrderId = await row.locator('th').nth(i).textContent();
        if(newOrderID.includes(rowOrderId)){
            await row.locator('button').first().click();
            break;
        }
    }

    await expect(page.locator('.tagline')).toHaveText('Thank you for Shopping With Us');

}
) 
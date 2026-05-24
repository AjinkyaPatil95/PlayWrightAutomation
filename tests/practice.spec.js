
import {test} from '@playwright/test';

test('Practice test', async ({ page }) => {
    const email= 'ajinkyapatil5@gmail.com';
    const pass= 'Radha@1008'
    const cont= '8421065995'
    const name= 'Ajinkya'
    const Lname= 'Patil'
    const opt= '2: Student'
    const username= page.locator('#userEmail');
    const dropDown= page.locator('[formcontrolname="occupation"]');
    const accessKey= page.locator('#userPassword');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('a.text-reset').click();
    await page.locator('#firstName').fill(name);
    await page.locator('#lastName').fill(Lname);
    await username.fill(email);
    await page.locator('#userMobile').fill(cont);
    await dropDown.waitFor({ state: 'visible'});
    await dropDown.selectOption(opt);
    await page.locator('[formcontrolname="gender"]').first().click();
    await accessKey.fill(pass);
    await page.locator('#confirmPassword').fill(pass);
    await page.locator('.col-md-1 input').click();
    await page.locator('#login').click();
    await page.locator('.btn.btn-primary').click();
    await page.locator('#userEmail').fill(email);
    await accessKey.fill(pass);
    await page.locator('#login').click();
    await console.log(await page.locator('.card-body b').first().textContent()); 
}
) 
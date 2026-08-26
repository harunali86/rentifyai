import { test, expect } from '@playwright/test';

test.describe('RentifyAI E2E Tests', () => {

    test.describe('Homepage', () => {
        test('should load homepage with hero section', async ({ page }) => {
            await page.goto('/');

            // Check navbar
            await expect(page.locator('nav')).toBeVisible();

            // Check hero section exists (Correct Text)
            await expect(page.getByText(/Find it. Tour it. Own it./i)).toBeVisible();

            // Check search/filter section
            const searchInput = page.getByPlaceholder(/Enter an address/i);
            await expect(searchInput).toBeVisible();
        });

        test('should display property cards or empty state', async ({ page }) => {
            await page.goto('/');

            // Wait for hydration
            await page.waitForTimeout(3000);

            // Robust Check: Verify the section header exists first
            await expect(page.getByText('Featured Properties')).toBeVisible();

            // Then check for EITHER a card OR the empty state container
            // Using specific testIDs is much more reliable
            const cardOrEmpty = page.getByTestId('property-card').first().or(page.getByTestId('featured-empty'));
            await expect(cardOrEmpty).toBeVisible({ timeout: 10000 });
        });
    });

    test.describe('Property Search', () => {
        test('should filter by property type', async ({ page }) => {
            await page.goto('/');
            await page.waitForTimeout(3000);

            // The filter might be a button or a set of chips
            const filters = page.getByRole('button', { name: /Property Type/i });
            if (await filters.isVisible()) {
                await filters.click();
                await page.waitForTimeout(1000);
            }
        });
    });

    test.describe('Authentication', () => {
        test('should show login page', async ({ page }) => {
            await page.goto('/login');

            // Check login form elements
            await expect(page.locator('input[type="email"]')).toBeVisible();
            await expect(page.locator('input[type="password"]')).toBeVisible();
            await expect(page.getByRole('button', { name: /sign in|login/i })).toBeVisible();
        });

        test('should show register page', async ({ page }) => {
            await page.goto('/register');

            // Check register form elements
            await expect(page.locator('input[type="email"]')).toBeVisible();
            await expect(page.locator('input[type="password"]')).toBeVisible();
            await expect(page.locator('input[name="name"]')).toBeVisible();
        });

        test('should show validation errors on empty login', async ({ page }) => {
            await page.goto('/login');

            // Click login without filling form
            await page.getByRole('button', { name: /sign in|login/i }).click();

            // HTML5 validation should prevent submission
            const emailInput = page.locator('input[type="email"]');
            const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
            expect(validationMessage).toBeTruthy();
        });
    });

    test.describe('Property Details', () => {
        test('should navigate to property detail page', async ({ page }) => {
            await page.goto('/');

            // Wait for hydration and data fetching
            await page.waitForTimeout(5000);

            // Check if any property links exist
            const propertyLinks = page.locator('a[href*="/properties/"]');
            const count = await propertyLinks.count();

            if (count > 0) {
                // Click the first link (could be the overlay Link)
                await propertyLinks.first().click();

                // Wait for navigation with a longer timeout
                await page.waitForURL(/\/properties\/.+/, { timeout: 15000 });
                await page.waitForLoadState('networkidle');

                // Check property detail elements
                await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 });

                // New UI specific check: Check for Price display
                await expect(page.getByText(/total price/i)).toBeVisible({ timeout: 10000 });
            }
        });
    });

    test.describe('Escrow/Booking Flow', () => {
        test('should show secure booking section on property page', async ({ page }) => {
            // Navigate to a property page first
            await page.goto('/');
            await page.waitForTimeout(5000);

            const propertyLinks = page.locator('a[href*="/properties/"]');
            const count = await propertyLinks.count();

            if (count > 0) {
                await propertyLinks.first().click();
                await page.waitForURL(/\/properties\/.+/, { timeout: 15000 });
                await page.waitForLoadState('networkidle');

                // Check for Booking Form elements (Anti-Leakage)
                // Use a more flexible text match or wait for the component
                await expect(page.getByText(/details are locked/i)).toBeVisible({ timeout: 15000 });

                const unlockBtn = page.getByRole('button', { name: /unlock|interest/i });
                await expect(unlockBtn).toBeVisible({ timeout: 10000 });
            }
        });
    });

    test.describe('Agent Portal', () => {
        test('should redirect unauthenticated users from agent area', async ({ page }) => {
            await page.goto('/agent/dashboard');

            // Should redirect to login
            await page.waitForURL(/\/login/);
            await expect(page.locator('input[type="email"]')).toBeVisible();
        });

        test('should redirect from agent properties page', async ({ page }) => {
            await page.goto('/agent/properties');

            // Should redirect to login
            await page.waitForURL(/\/login/);
        });
    });

});

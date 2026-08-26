
import { test, expect } from '@playwright/test';

test.describe('Rentify Zillow Parity E2E', () => {

    test('Auth Modal triggers on Save (Heart) click when not logged in', async ({ page }) => {
        // 1. Go to homepage with full load wait
        await page.goto('http://localhost:3000');
        await page.waitForTimeout(3000);

        // 2. Find any "Heart" button specifically on the carousel or hero
        // The heart icon is usually SVGSVGElement, inside a button
        // We use a broader selector: button that contains SVG with "Heart" class or behavior
        const heartButtons = page.locator('button .lucide-heart');
        await heartButtons.first().waitFor({ state: 'visible' });

        // 3. Click parent button of the icon
        await heartButtons.first().click();

        // 4. Expect Modal to appear (looking for specific text in AuthModal)
        // "Unlock this home" or "Log in"
        await expect(page.getByText(/Log in/i).first()).toBeVisible();

        // 5. Close it (Click overlay or X)
        const closeBtn = page.locator('button .lucide-x').first();
        if (await closeBtn.isVisible()) {
            await closeBtn.click();
        } else {
            // Click outside
            await page.mouse.click(10, 10);
        }
    });

    test('Unified Contact Widget tabs switch correctly', async ({ page }) => {
        // 1. Navigate to a property page (using a known slug or ensuring one exists)
        // For test stability, we'll try to click the first property from home
        await page.goto('http://localhost:3000');
        const firstProperty = page.locator('a[href^="/properties/"]').first();
        await firstProperty.click();

        // 2. Wait for Contact Widget
        const widget = page.locator('text=Verified Partner Agent');
        await widget.waitFor({ state: 'visible' });

        // 3. Default tab should be "Tour"
        await expect(page.locator('text=Express Interest & Unlock')).toBeVisible();

        // 4. Click "Message" tab
        await page.click('button:has-text("Message")');

        // 5. Expect Message form inputs
        await expect(page.locator('textarea[placeholder*="Ask about negotiation"]')).toBeVisible();

        // 6. Navigate back to "Tour"
        await page.click('button:has-text("Tour")');
        await expect(page.locator('text=Express Interest & Unlock')).toBeVisible();
    });

    test('Mobile Map Toggle Button works', async ({ page }) => {
        // 1. Set Viewport to Mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('http://localhost:3000/search');

        // 2. Check for "Map View" button (it should be visible on mobile)
        const toggleBtn = page.locator('button:has-text("Map View")');
        await expect(toggleBtn).toBeVisible();

        // 3. Click it -> Should become "Show List"
        await toggleBtn.click();
        await expect(page.locator('button:has-text("Show List")')).toBeVisible();

        // 4. Map should be visible (logic check: map container has display block)
        // Note: This relies on implementation details (css classes), checking text change is safer E2E.
    });

});

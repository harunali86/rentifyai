import { test, expect } from '@playwright/test';

test.describe('RentifyAI Complete Zillow + NoBroker + Amphenol Parity Suite', () => {

    test('1. Homepage: Hero Search, City Chips, NoBroker Trust Banner & Zillow Footer', async ({ page }) => {
        // Navigate to Homepage with domcontentloaded
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        // Verify Hero Title
        await expect(page.getByRole('heading', { name: /Find it\. Tour it\. Own it\./i })).toBeVisible({ timeout: 10000 });

        // Verify Search Input
        const searchInput = page.getByPlaceholder(/Enter an address, neighborhood/i);
        await expect(searchInput).toBeVisible();

        // Verify City Discovery Quick Chips
        const popularLabel = page.getByText(/Popular:/i);
        await expect(popularLabel).toBeVisible();
        
        const puneChip = page.getByRole('button', { name: 'Pune' });
        await expect(puneChip).toBeVisible();
        const mumbaiChip = page.getByRole('button', { name: 'Mumbai' });
        await expect(mumbaiChip).toBeVisible();

        // Scroll to NoBroker Zero Brokerage Guarantee Banner
        const guaranteeBanner = page.getByText(/100% Zero Brokerage Guarantee/i).first();
        await guaranteeBanner.scrollIntoViewIfNeeded();
        await expect(guaranteeBanner).toBeVisible();

        // Verify NoBroker key stats
        await expect(page.getByText(/₹120\+ Cr/i).first()).toBeVisible();
        await expect(page.getByText(/Brokerage Saved/i).first()).toBeVisible();
        await expect(page.getByText(/RERA Verified/i).first()).toBeVisible();

        // Verify Indian Home Essential Services
        await expect(page.getByText(/Online Rent Agreement/i).first()).toBeVisible();
        await expect(page.getByText(/Instant Home Loans/i).first()).toBeVisible();
        await expect(page.getByText(/Packers & Movers/i).first()).toBeVisible();

        // Scroll to Zillow-grade 4-Column Footer
        const footer = page.locator('footer');
        await footer.scrollIntoViewIfNeeded();
        await expect(footer).toBeVisible();
        await expect(footer.getByText(/Real Estate/i).first()).toBeVisible();
        await expect(footer.getByText(/Rentals & Leases/i).first()).toBeVisible();
        await expect(footer.getByText(/Valuation & Tools/i).first()).toBeVisible();
        await expect(footer.getByText(/Equal Housing Opportunity/i)).toBeVisible();
        
        // Short pause for headed visual inspection
        await page.waitForTimeout(1000);
    });

    test('2. Search Split-View: Sorting, Save Search Alert & Zero Brokerage Property Cards', async ({ page }) => {
        await page.goto('/search', { waitUntil: 'domcontentloaded' });

        // Verify Split-view Header
        const resultsHeader = page.locator('h1:has-text("Real Estate & Homes")');
        await expect(resultsHeader).toBeVisible({ timeout: 10000 });

        // Test Dynamic Sort Dropdown (Zillow Parity)
        const sortSelect = page.locator('select:has(option[value="price_asc"])');
        await expect(sortSelect).toBeVisible();

        // Change sort to Price: Low to High
        await sortSelect.selectOption('price_asc');
        await expect(sortSelect).toHaveValue('price_asc');

        // Change sort to Price: High to Low
        await sortSelect.selectOption('price_desc');
        await expect(sortSelect).toHaveValue('price_desc');

        // Test "Save Search 🔔" Alert Button Toggle (Targeting the Split View Alert button)
        const saveSearchBtn = page.getByRole('button', { name: /Save Search|Alerts Active/i }).last();
        await expect(saveSearchBtn).toBeVisible();
        await expect(saveSearchBtn).toContainText('Save Search');

        // Click to toggle on
        await saveSearchBtn.click();
        await expect(saveSearchBtn).toContainText('Alerts Active ✓');

        // Click to toggle off
        await saveSearchBtn.click();
        await expect(saveSearchBtn).toContainText('Save Search');

        // Verify Property Cards have NoBroker "⚡ ZERO BROKERAGE" badge
        const propertyCards = page.locator('[data-testid="property-card"]');
        await expect(propertyCards.first()).toBeVisible({ timeout: 10000 });
        
        const zeroBrokerageBadge = propertyCards.first().getByText(/ZERO BROKERAGE/i);
        await expect(zeroBrokerageBadge).toBeVisible();

        // Test Interactive Heart (Favorite) button
        const heartBtn = propertyCards.first().locator('button[title*="Save Property"], button[title*="Saved"]');
        await expect(heartBtn).toBeVisible();
        await heartBtn.click();
        await expect(heartBtn).toHaveAttribute('title', 'Saved to Favorites');

        // Verify WhatsApp Quick Connect button
        const waButton = propertyCards.first().locator('a[href*="wa.me"]');
        await expect(waButton).toBeVisible();
        await expect(waButton).toContainText('WhatsApp');

        // Short pause for headed visual inspection
        await page.waitForTimeout(1000);
    });

    test('3. Property Details: Image Gallery, MahaRERA ID, Zestimate & Contact Widget', async ({ page }) => {
        // Direct navigation to flagship Koregaon Park property
        await page.goto('/properties/koregaon-park-lane-1-heritage-colonial-villa', { waitUntil: 'domcontentloaded' });

        // Verify Property Title & Price
        await expect(page.getByRole('heading', { name: /Koregaon Park Lane 1 Heritage Colonial Villa/i })).toBeVisible({ timeout: 10000 });
        await expect(page.getByText(/₹14,50,00,000/i).or(page.getByText(/14\.50/i)).first()).toBeVisible();

        // Verify Specs (Bedrooms, Bathrooms, Sqft)
        await expect(page.getByText(/Bedrooms/i).first()).toBeVisible();
        await expect(page.getByText(/Square Feet/i).first()).toBeVisible();

        // Verify MahaRERA Registration Badge
        const reraBadge = page.getByText(/MahaRERA: P52100028941/i).first();
        await expect(reraBadge).toBeVisible();

        // Verify Zestimate Valuation Widget
        const zestimateWidget = page.getByText(/Zestimate®/i).first();
        await zestimateWidget.scrollIntoViewIfNeeded();
        await expect(zestimateWidget).toBeVisible();

        // Verify Mortgage Calculator / Monthly Cost Estimator
        const estimatorSection = page.getByText(/Monthly Cost Estimator/i).first();
        await estimatorSection.scrollIntoViewIfNeeded();
        await expect(estimatorSection).toBeVisible();
        await expect(page.getByText(/Estimated EMI/i).first()).toBeVisible();

        // Verify Contact Widget with Instant WhatsApp CTA
        const contactWaBtn = page.locator('a[href*="wa.me"]').filter({ hasText: /Instant WhatsApp Chat/i }).first();
        await contactWaBtn.scrollIntoViewIfNeeded();
        await expect(contactWaBtn).toBeVisible();

        // Short pause for headed visual inspection
        await page.waitForTimeout(1000);
    });

    test('4. Amphenol Gemini AI Concierge: FAB, Instant Greeting & Recommended Inventory', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        // Verify Floating AI Copilot Trigger (FAB button at bottom-right)
        const copilotFab = page.locator('button[title="Open RentifyAI Real Estate Copilot"]');
        await expect(copilotFab).toBeVisible({ timeout: 10000 });
        await expect(copilotFab).toContainText('RentifyAI Copilot');

        // Click FAB to open the AI Concierge Drawer
        await copilotFab.click();

        // Verify Drawer Header
        const drawerHeader = page.getByRole('heading', { name: /RentifyAI Advisor/i });
        await expect(drawerHeader).toBeVisible();
        await expect(page.getByText(/Real Estate Intelligence Engine • Pune R&D Hub/i)).toBeVisible();
        await expect(page.getByText(/MahaRERA & HRERA Verified Inventory/i)).toBeVisible();

        // Verify Chat Input Bar
        const chatInput = page.getByPlaceholder(/Ask specs, localities, budget/i);
        await expect(chatInput).toBeVisible();

        // Send a greeting to trigger the instant concierge response
        await chatInput.fill('hi');
        const sendBtn = page.locator('button[title="Send message"]');
        await expect(sendBtn).toBeEnabled();
        await sendBtn.click();

        // Verify Concierge Reply appears
        await expect(page.getByText(/Welcome to RentifyAI/i).or(page.getByText(/Koregaon Park/i)).first()).toBeVisible({ timeout: 10000 });

        // Verify Quick Technical Prompt pills
        const quickPromptBtn = page.getByRole('button', { name: /Villas in Koregaon Park/i }).first();
        await expect(quickPromptBtn).toBeVisible();

        // Close the Drawer
        const closeBtn = page.locator('button[title="Close Assistant"]');
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();

        // Drawer should close and FAB reappear
        await expect(copilotFab).toBeVisible();

        // Short pause for headed visual inspection
        await page.waitForTimeout(1000);
    });

    test('5. Verified Agents Directory: MahaRERA Registration & Instant Action CTAs', async ({ page }) => {
        await page.goto('/agents', { waitUntil: 'domcontentloaded' });

        // Verify Page Header
        await expect(page.getByRole('heading', { name: /Premier Real Estate Advisors/i })).toBeVisible({ timeout: 10000 });
        await expect(page.getByText(/RERA REGISTERED PARTNERS/i)).toBeVisible();

        // Verify Agent Cards render with verified credentials
        const rajeshCard = page.locator('h3:has-text("Rajesh Godbole")');
        await expect(rajeshCard).toBeVisible();

        // Verify MahaRERA registration number
        await expect(page.getByText(/MahaRERA: A52100018942/i)).toBeVisible();

        // Verify Deals & Transacted Volume Metrics
        await expect(page.getByText(/Transacted/i).first()).toBeVisible();
        await expect(page.getByText(/Listings/i).first()).toBeVisible();

        // Verify Direct Phone / Action Link
        await expect(page.getByText(/\+91 98220 41890/i)).toBeVisible();

        // Short pause for headed visual inspection
        await page.waitForTimeout(1000);
    });

});

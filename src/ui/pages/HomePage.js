import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.articlePreviewCard = page.locator('.article-preview');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  getArticlePreviewCard(position) {
    return this.articlePreviewCard.nth(position);
  }

  authorLinkInArticlePreview(username) {
    return this.page.getByRole('link', { name: username });
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickHomeLink() {
    await this.step(`Click the 'Home' link`, async () => {
      await this.homeLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticlePreviewHasCorrectTitle(previewTitle, CardPosition) {
    await this.step(`Assert the article preview has '${previewTitle}' title`, async () => {
      const articleCard = this.getArticlePreviewCard(CardPosition);
      
      await expect(articleCard).toBeVisible();
      await expect(articleCard).toContainText(previewTitle);
    });
  }

  async assertArticlePreviewHasCorrectAuthor(authorName, CardPosition) {
    await this.step(`Assert the article preview has '${authorName}' author name `, async () => {
      const articlesPreview = await this.getArticlePreviewCard(CardPosition);
      const authorLink = articlesPreview.locator('a', { hasText: authorName });
      
      await expect(authorLink).toBeVisible();
    });
  }
}

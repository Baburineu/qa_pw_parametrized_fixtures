import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.HomeLink = page.getByRole('link', { name: 'Home' });
    this.articlePreviewCard = page.locator('.article-preview');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getArticlePreviewsCards() {
    await this.articlePreviewCard.first().waitFor();
    return await this.articlePreviewCard.all();
  }

  authorLinkInArticlePreview(username) {
    return this.page.getByRole('link', { username });
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickHomeLink() {
    await this.step(`Click the 'Home' link`, async () => {
      await this.HomeLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticlePreviewHasCorrectTitle(previewTitle, CardPosition) {
    await this.step(`Assert the article preview has correct title`, async () => {
      let articlesPreview = await this.getArticlePreviewsCards()
      await expect(articlesPreview[CardPosition]).toContainText(previewTitle);
    });
  }

  async assertArticlePreviewHasCorrectAuthor(authorName, CardPosition) {
    await this.step(`Assert the article preview has correct author name`, async () => {
      const articlesPreview = await this.getArticlePreviewsCards();
      const authorLink = articlesPreview[CardPosition].filter({
        has: this.authorLinkInArticlePreview(authorName)});
      
      await expect(authorLink).toBeVisible();
    });
  }
}

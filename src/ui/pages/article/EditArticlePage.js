import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });

  };

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  };

  tagListItem(tagName) {
    return this.page.locator('span').filter({ hasText: `${tagName}` }).locator('.ion-close-round');
  };

  async clickOnRemoveTag(tags) {
    for(let tag of tags){
      await this.step(`Remove '${tag}' tag`, async () => {
        const tagLocator = this.tagListItem(tag);
        await (tagLocator).click();
        await expect(tagLocator).not.toBeVisible();
      });
    };
  };

  async addTags(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.pressSequentially(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async clickOnUpdateArticleButton() {
    await this.step(`Click on 'Update Article' button`, async () => {
      await this.updateArticleButton.click()
    })
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}

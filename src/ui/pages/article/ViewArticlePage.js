import { expect, testStep } from '../../../common/pwHelpers/pw';

export class ViewArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', {name: 'Edit Article'}).first();
    this.followButton = page.getByRole('button', { name: 'Follow' }).first()
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  tagListItem(tagName) {
    return this.page.getByRole('listitem').filter({
      has: this.page.getByText(tagName, { exact: true })
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await this.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async clickOnEditArticleButton() {
    await this.step(`Click on 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await this.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await this.step(
      `Assert the article has correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      },
    );
  }

  async assertArticleTextIsVisible(text) {
    await this.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await this.step(`Assert the article has correct tags`, async () => {
      await expect( async() => {
        await this.page.reload();
        await expect(this.tagListItem(tags[0])).toBeVisible({timeout: 2000});
      }).toPass({timeout: 15000})
      
      for (let i = 0; i < tags.length; i++) {
        await expect(this.tagListItem(tags[i])).toBeVisible();
      }
    });
  }

  async assertArticleTagsAreRemoved(tags) {
    await this.step(`Asser the article tags removed`, async() => {
      for (let tag of tags) {
        await expect(this.tagListItem(tag)).not.toBeVisible();
      }
    })
  }

  async clickOnFollowButton() {
    await this.step(`Click on the 'Follow' user button`, async() => {
      await this.followButton.click();
    });
  };
}

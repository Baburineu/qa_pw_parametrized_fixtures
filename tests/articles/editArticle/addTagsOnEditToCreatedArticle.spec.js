import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { createArticle } from "../../../src/ui/actions/articles/createArticle";
import { test } from "../../_fixtures/fixtures";
import { generateNewArticleData } from "../../../src/common/testData/generateNewArticleData";
import { EditArticlePage } from "../../../src/ui/pages/article/EditArticlePage";
import { ViewArticlePage } from "../../../src/ui/pages/article/ViewArticlePage";
import { expect } from "@playwright/test";

const testParameters = [
  {tagsNumber: 1, testName: 'one tag'},
  {tagsNumber: 2, testName: 'two tags'},
  {tagsNumber: 5, testName: 'five tags'},
];

testParameters.forEach(({tagsNumber, testName}) => {
  test.describe('User is able to add tags on edit to the previously created article', () => {
    test.beforeEach( async ({page, user, articleWithoutTags}) => {
      await signUpUser(page, user);
      await createArticle(page, articleWithoutTags);
    })
    
    test(`Add ${testName} to created article `, async ({page, articleWithoutTags, logger}) => {
        const viewArticlePage = new ViewArticlePage(page);
        const editArticlePage = new EditArticlePage(page);
        const newArticleData = generateNewArticleData(logger, tagsNumber)

        await viewArticlePage.open(articleWithoutTags.url);
        await viewArticlePage.clickOnEditArticleButton()

        await editArticlePage.fillTagsField(newArticleData.tags);
        await editArticlePage.clickOnUpdateArticleButton()

        await viewArticlePage.open(articleWithoutTags.url);
        await viewArticlePage.assertArticleTagsAreVisible(newArticleData.tags);
    })
  })
})

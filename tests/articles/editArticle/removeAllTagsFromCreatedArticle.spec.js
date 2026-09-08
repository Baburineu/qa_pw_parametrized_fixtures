import { generateNewArticleData } from "../../../src/common/testData/generateNewArticleData";
import { createArticle } from "../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../src/ui/actions/auth/signUpUser";
import { EditArticlePage } from "../../../src/ui/pages/article/EditArticlePage";
import { ViewArticlePage } from "../../../src/ui/pages/article/ViewArticlePage";
import { test } from "../../_fixtures/fixtures";

let article;
const testParameters = [
  {tagsNumber: 1, testName: 'one tag'},
  {tagsNumber: 2, testName: 'all two tags'},
  {tagsNumber: 5, testName: 'all five tags'},
];

testParameters.forEach(({tagsNumber, testName}) => {
  test.describe(`User is able to remove all tags from previously created article`, () => {
    test.beforeEach(async ({page, user, logger}) => {
      article = generateNewArticleData(logger, tagsNumber)

      await signUpUser(page, user);
      await createArticle(page, article)
    })

    test(`Remove ${testName} from created article`, async ({page}) => {
      const viewArticlePage = new ViewArticlePage(page);
      const editArticlePage = new EditArticlePage(page);

      await viewArticlePage.open(article.url);
      await viewArticlePage.assertArticleTagsAreVisible(article.tags);

      await viewArticlePage.clickOnEditArticleButton()

      await editArticlePage.clickOnRemoveTag(article.tags);
      await editArticlePage.clickOnUpdateArticleButton()

      await viewArticlePage.open(article.url);
      await viewArticlePage.assertArticleTagsAreRemoved(article.tags)
    })
  })
})
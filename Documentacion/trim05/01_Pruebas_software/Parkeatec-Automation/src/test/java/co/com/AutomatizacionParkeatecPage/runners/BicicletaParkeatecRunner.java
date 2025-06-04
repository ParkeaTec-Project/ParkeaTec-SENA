package co.com.AutomatizacionParkeatecPage.runners;

import cucumber.api.CucumberOptions;
import cucumber.api.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/registroBicicleta_parkeatec.feature",
        glue = {"co.com.AutomatizacionParkeatecPage.stepsdefinitions", "co.com.AutomatizacionParkeatecPage.utils.hooks"},
        snippets = SnippetType.CAMELCASE)

public class BicicletaParkeatecRunner {
}

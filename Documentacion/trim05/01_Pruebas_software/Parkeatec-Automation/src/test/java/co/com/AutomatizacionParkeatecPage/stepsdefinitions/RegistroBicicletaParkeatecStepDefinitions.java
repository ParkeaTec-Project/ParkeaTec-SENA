package co.com.AutomatizacionParkeatecPage.stepsdefinitions;

import co.com.AutomatizacionParkeatecPage.models.InfoBicicleta;
import co.com.AutomatizacionParkeatecPage.tasks.RegistroBicicleta;
import cucumber.api.DataTable;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import java.util.List;

import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;

public class RegistroBicicletaParkeatecStepDefinitions {
    @Cuando("^ingrese al apartado de formulario y seleccione llenar formulario$")
    public void ingreseAlApartadoDeFormularioYSeleccioneLlenarFormulario(List<InfoBicicleta> info) {
        theActorInTheSpotlight().attemptsTo(RegistroBicicleta.aute(info));
    }

    @Entonces("^se debe registrar la informacion y verificar que la informacion del vehiculo haya sido registrada correctamente y visualizar en los vehiculos\\.$")
    public void seDebeRegistrarLaInformacionYVerificarQueLaInformacionDelVehiculoHayaSidoRegistradaCorrectamenteYVisualizarEnLosVehiculos() {

    }
}

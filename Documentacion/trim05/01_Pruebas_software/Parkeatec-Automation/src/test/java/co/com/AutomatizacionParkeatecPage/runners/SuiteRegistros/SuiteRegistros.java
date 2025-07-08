package co.com.AutomatizacionParkeatecPage.runners.SuiteRegistros;

import co.com.AutomatizacionParkeatecPage.runners.*;
import co.com.AutomatizacionParkeatecPage.tasks.RealizarReserva;
import co.com.AutomatizacionParkeatecPage.userinterfaces.VerReservas;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        RegistroParkeatecRunner.class,
        BicicletaParkeatecRunner.class,
        RealizarReservaParkeatecRunner.class

})

public class SuiteRegistros {
}

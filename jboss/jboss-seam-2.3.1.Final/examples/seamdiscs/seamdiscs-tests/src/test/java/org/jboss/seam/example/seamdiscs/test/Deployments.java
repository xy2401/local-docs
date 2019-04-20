package org.jboss.seam.example.seamdiscs.test;

import java.io.File;

import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.importer.ZipImporter;
import org.jboss.shrinkwrap.api.spec.EnterpriseArchive;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.Maven;

public class Deployments {
    public static EnterpriseArchive seamdiscsDeployment() {
        EnterpriseArchive ear = ShrinkWrap.create(ZipImporter.class, "seam-seamdiscs.ear").importFrom(new File("../seamdiscs-ear/target/seam-seamdiscs.ear"))
              .as(EnterpriseArchive.class);

        // Install org.jboss.seam.mock.MockSeamListener
        WebArchive web = ear.getAsType(WebArchive.class, "seamdiscs-web.war");
        web.delete("/WEB-INF/web.xml");
        web.addAsWebInfResource("web.xml");
        
        web.delete("/WEB-INF/faces-config.xml");
        
        web.addAsResource("org/jboss/seam/example/seamdiscs/test/BaseData.xml", "org/jboss/seam/example/seamdiscs/test/BaseData.xml");
        
        JavaArchive ejb =  ear.getAsType(JavaArchive.class, "seamdiscs-ejb.jar");
        ejb.addClasses(TestStrings.class);
        
        ear.addAsLibraries(Maven.resolver().loadPomFromFile("pom.xml")
        		.resolve("org.dbunit:dbunit:jar:2.2").withTransitivity().asFile());

        return ear;
    }
}

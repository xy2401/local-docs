

 
- [20190607](#20190607)
    - [spring.zip](#spring.zip) 获取spring文档zip包




# 20190607

## spring.zip

获取 spring repo 中都所有 文档 zip  比如

[Index of release/org/springframework/spring/5.1.7.RELEASE](https://repo.spring.io/release/org/springframework/spring/5.1.7.RELEASE/)

    $##递归获取spring repo 所有html
    $nohup wget -bc -r -A.html -o repo.spring.log https://repo.spring.io/release/ &

    FINISHED --2019-05-21 11:01:46--
    Total wall clock time: 1h 7m 29s
    Downloaded: 33231 files, 47M in 2.1s (22.7 MB/s)

     $#查找所有 zip 链接
     $grep -r "\.zip"  *
     repo.spring.io/release/org/springframework/spring-roo/1.3.2.RELEASE/index.html:<a href="reference.zip.asc">reference.zip.asc</a>   01-Sep-2015 08:54  183 bytes
     #查找所有zip地址 除去版本号并且 去重
     $grep -r "\.zip"  *  | cut -d :  -f 1 | sed 's/[^\/]*\/[^\/]*$//g' | uniq


    $grep -r "\.zip"  *  | cut -d :  -f 1 | sed 's/[^\/]*\/[^\/]*$//g' | uniq
    repo.spring.io/release/io/spring/platform/platform/
    repo.spring.io/release/io/spring/docresources/spring-doc-resources/
    repo.spring.io/release/io/spring/initializr/initializr-docs/
    repo.spring.io/release/io/spring/initializr/initializr-web/
    repo.spring.io/release/io/spring/javaformat/io.spring.javaformat.eclipse.site/
    repo.spring.io/release/io/projectreactor/kafka/reactor-kafka/
    repo.spring.io/release/io/projectreactor/reactor-test/
    repo.spring.io/release/io/projectreactor/reactor-logback/
    repo.spring.io/release/io/projectreactor/reactor-core/
    repo.spring.io/release/io/projectreactor/addons/reactor-logback/
    repo.spring.io/release/io/projectreactor/rabbitmq/reactor-rabbitmq/
    repo.spring.io/release/io/projectreactor/ipc/reactor-netty/
    repo.spring.io/release/io/projectreactor/netty/reactor-netty/
    repo.spring.io/release/com/rabbitmq/http-client/
    repo.spring.io/release/org/springframework/android/spring-android/
    repo.spring.io/release/org/springframework/statemachine/spring-statemachine/
    repo.spring.io/release/org/springframework/shell/spring-shell/
    repo.spring.io/release/org/springframework/shell/spring-shell-docs/
    repo.spring.io/release/org/springframework/amqp/spring-amqp-dist/
    repo.spring.io/release/org/springframework/amqp/spring-amqp/
    repo.spring.io/release/org/springframework/kafka/spring-kafka-dist/
    repo.spring.io/release/org/springframework/security/spring-security/
    repo.spring.io/release/org/springframework/vault/spring-vault/
    repo.spring.io/release/org/springframework/ws/spring-ws/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-stream-binder-kafka-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-dataflow-server-kubernetes-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-gcp-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-stream-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-dataflow-server-cloudfoundry-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-task-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-stream-binder-rabbit-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-cloudfoundry-service-broker/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-dataflow-server-mesos-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-dataflow-server-yarn-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-open-service-broker/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-dataflow-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-app-broker/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-skipper-docs/
    repo.spring.io/release/org/springframework/cloud/spring-cloud-stream-core-docs/
    repo.spring.io/release/org/springframework/data/spring-data-jdbc-ext/
    repo.spring.io/release/org/springframework/data/spring-data-mongodb-dist/
    repo.spring.io/release/org/springframework/data/spring-data-gemfire/
    repo.spring.io/release/org/springframework/data/spring-data-neo4j-dist/
    repo.spring.io/release/org/springframework/data/spring-data-hadoop/
    repo.spring.io/release/org/springframework/data/spring-data-commons-dist/
    repo.spring.io/release/org/springframework/data/spring-data-graph-dist/
    repo.spring.io/release/org/springframework/data/spring-data-neo4j-distribution/
    repo.spring.io/release/org/springframework/data/spring-data-jpa/
    repo.spring.io/release/org/springframework/data/spring-data-redis/
    repo.spring.io/release/org/springframework/data/spring-data-solr/
    repo.spring.io/release/org/springframework/hateoas/spring-hateoas/
    repo.spring.io/release/org/springframework/boot/spring-boot-starters/
    repo.spring.io/release/org/springframework/boot/spring-boot-actuator-autoconfigure/
    repo.spring.io/release/org/springframework/boot/spring-boot-cli/
    repo.spring.io/release/org/springframework/boot/spring-boot-gradle-plugin/
    repo.spring.io/release/org/springframework/boot/spring-boot-docs/
    repo.spring.io/release/org/springframework/social/spring-social-facebook/
    repo.spring.io/release/org/springframework/social/spring-social-yammer/
    repo.spring.io/release/org/springframework/social/spring-social-twitter/
    repo.spring.io/release/org/springframework/social/spring-social/
    repo.spring.io/release/org/springframework/social/spring-social-linkedin/
    repo.spring.io/release/org/springframework/ldap/spring-ldap/
    repo.spring.io/release/org/springframework/flex/spring-flex/
    repo.spring.io/release/org/springframework/spring/
    repo.spring.io/release/org/springframework/batch/spring-batch-dist/
    repo.spring.io/release/org/springframework/batch/spring-batch/
    repo.spring.io/release/org/springframework/mobile/spring-mobile/
    repo.spring.io/release/org/springframework/spring-roo/
    repo.spring.io/release/org/springframework/xd/spring-xd-analytics-ml-pmml/
    repo.spring.io/release/org/springframework/xd/spring-xd/
    repo.spring.io/release/org/springframework/webflow/webflow/
    repo.spring.io/release/org/springframework/session/spring-session-data-mongodb/
    repo.spring.io/release/org/springframework/session/spring-session-build/
    repo.spring.io/release/org/springframework/credhub/spring-credhub/
    repo.spring.io/release/org/springframework/restdocs/spring-restdocs/
    repo.spring.io/release/org/springframework/integration/spring-integration-hazelcast/
    repo.spring.io/release/org/springframework/integration/spring-integration-aws/
    repo.spring.io/release/org/springframework/integration/spring-integration-kafka/
    repo.spring.io/release/org/springframework/integration/spring-integration-splunk/
    repo.spring.io/release/org/springframework/integration/spring-integration-smpp/
    repo.spring.io/release/org/springframework/integration/spring-integration-smb/
    repo.spring.io/release/org/springframework/integration/spring-integration-java-dsl/
    repo.spring.io/release/org/springframework/integration/spring-integration-flow/
    repo.spring.io/release/org/springframework/integration/spring-integration-cassandra/
    repo.spring.io/release/org/springframework/integration/spring-integration-zip/
    repo.spring.io/release/org/springframework/integration/spring-integration/
    repo.spring.io/release/org/springframework/integration/spring-integration-social-twitter/


471.53 MB 
[Index of release/org/springframework/xd/spring-xd/1.3.2.RELEASE](https://repo.spring.io/release/org/springframework/xd/spring-xd/1.3.2.RELEASE/)

41.97 MB
[Index of release/org/springframework/batch/spring-batch-dist/1.1.0.RELEASE](https://repo.spring.io/release/org/springframework/batch/spring-batch-dist/1.1.0.RELEASE/)


# 20190522

  下载 maven中央库 所有都 index.html

    nohup wget -bc -r -A.html -o  maven.log  -U "Googlebot" -e  robots=off  http://central.maven.org/ &


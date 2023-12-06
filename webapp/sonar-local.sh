export SONAR_SCANNER_VERSION=5.0.1.3006
export SONAR_SCANNER_HOME=$HOME/.sonar/sonar-scanner-$SONAR_SCANNER_VERSION-linux
export PATH=$SONAR_SCANNER_HOME/bin:$PATH
export SONAR_SCANNER_OPTS="-server"

export SONAR_TOKEN=sqp_454af29a9f8b16072bd74ef63e25c144fc0cbdba

sonar-scanner \
  -Dsonar.projectKey=bbva-front \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000

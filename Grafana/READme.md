##Starting Grafana##

1. install grafana "brew install grafana"
2. Configure the config
   1. cd /opt/homebrew/opt/grafana/share/grafana/conf/
   2. nano grafana.ini
   3. [security]
      allow_embedding = true
   4. CTRL + X, 'Y', 'Enter'
3. Enable rabbitmq plugins
   1. rabbitmq-plugins enable rabbitmq_management
   2. rabbitmq-plugins enable rabbitmq_prometheus
4. grafana server --homepath /opt/homebrew/opt/grafana/share/grafana --config=/opt/homebrew/opt/grafana/share/grafana/conf/grafana.ini
5. start grafana "brew services start grafana"
6. navigate to localhost:3000
7. Username and Passowrd should be "admin"
8. Click on "Add data source", add prometheus
9.  Oh snap now you need a prometheus Url
10. Okay u got it
11. create an Iframe with the public dashboard URL!! "http://localhost:3000/public-dashboards/92032ef9b30446eb83b9482ebbe059d7"
12. configure the grafana.ini to allow for iframes (need to tell it what the homepath is and where your config file is) and make sure Grafana has been stopped before doing so!
 "grafana server --homepath /opt/homebrew/opt/grafana/share/grafana --config=/opt/homebrew/opt/grafana/share/grafana/conf/grafana.ini"
 1.  "/opt/homebrew/opt/grafana/share/grafana/conf/defaults.ini"



grafanaserver --config=/opt/homebrew/opt/grafana/share/grafana/conf/grafana.ini

##Stopping Grafana##
1. 'brew services stop grafana'
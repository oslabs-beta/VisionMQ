# visionmq

The following instructions are assumed for a MacOS system, we will be updating this README for other OS very soon.

---

### First thing, clone the repo to your local machine:


`git clone https://github.com/oslabs-beta/VisionMQ.git`

--- 

### If you have RabbitMQ on your system:

Please add the following line to your configuration file:

`management.cors.allow_origins.1 = *`

---

### If you don’t have RabbitMQ on your system:

Please follow the instructions at the following link to download RabbitMQ:

[https://www.rabbitmq.com/download.html](https://www.rabbitmq.com/download.html)

We used `homebrew` and this is how we did it:

-   Download homebrew if you don’t have it on your system: https://brew.sh/
-   Update homebrew if needed: `brew update`

`brew install rabbitmq` (this might take a second…)

**You will also have to move the config file, located in the top level of this repo titled `rabbitmq.conf` to the RabbitMQ config filepath.**

You can do this with the following steps:

-   Navigate to the VisionMQ directory that you cloned from this github page.
    
   Move the config file: `mv ./rabbitmq.conf *<file path>*`
    
   - The file path is:
    
        `cd /usr/local/opt/rabbitmq/sbin` for Intel Macs
    
        `cd /opt/homebrew/etc/` for Apple Silicon Macs
    
---

### Once you have RabbitMQ and have updated your config file:

Enable RabbitMQ Management API:

- Locate the sbin folder with in the following route:
    
    `/usr/local/Cellar/rabbmitmq/*<version>*/sbin` for Intel Macs
    
    `/opt/homebrew/opt/rabbitmq/sbin` for Apple Silicon Macs

Run the following:

`./rabbitmq-plugins enable rabbitmq_management`

Enable Prometheus for RabbitMQ:

`./rabbitmq-plugins enable rabbitmq_prometheus`

Restart RabbitMQ:

`brew services restart rabbitmq`

---

### Download and Run Prometheus

Download Prometheus: [https://prometheus.io/download/](https://prometheus.io/download/)

-   Click your respective OS (_Darwin_ for Mac)

Run Prometheus:

-   Click prometheus.exe to open it (if it fails to run, make sure to enable it as a developer in your security settings)
-   Move the code from the `prometheus.yml` file from this repository into your YML file for your local instance of Prometheus by running: `mv ./prometheus.yml *<file path>*` 
- If you already have Prometheus, copy the following into your existing YML file, as an element into the scraped_configs array:

        - job_name: 'rabbit-per'
            static_configs:
              - targets: ['localhost:15692']
            metrics_path: '/metrics/per-object'
    
-   Start or restart your local instance of Prometheus.
 ---

### Configure Enviornment Variables Needed:

-   Create an .env file at the root level of the VisionMQ directory.
-   Add the following variables to the env file:

```jsx
RABBIT_USERNAME = "guest"
RABBIT_PASSWORD = "guest"
RABBIT_URL = "<http://localhost:15672/api/definitions>"
```

-   If you have configured custom credentials for your RabbitMQ Management API, change the values of these environment variables.
 ---
### Let's run!

-   Run the following commands to run your local instance of VisionMQ
    -   `npm install`
    -   `npm run build`
    -   `npm run dev`
-   You will now see an instance available on localhost:/8080.


# Welcome to VisionMQ!

VisionMQ is an observability tool for the message broker, RabbitMQ. Using Vision you'll be able to model and display micro-service applications, tracking overall health of messaging queues, successful deliveries and network pain points.

##### <i>To read more about the VisionMQ's background, [read our medium article](https://medium.com/@clynnfrench/observability-in-rabbitmq-heres-our-experience-with-visionmq-v1-0-b82a61b1983b)!</i>

### Disclaimer
VisionMQ is in early stages of development. Please let us know of any questions or concerns. Yoou are more than welcome to open issues or pull requests to contribute to the growth of the project. This was built for the RabbitMQ community and we want it to be a helpful tool!

### Let's Get Started

#### To begin, you will be downloading RabbitMQ and Prometheus. If these are already on your system, please skip the relevant sections. 




<img src="https://github.com/oslabs-beta/VisionMQ/assets/146690609/2b1b6e67-03d0-44aa-98f3-096195d63866">


The following instructions are for a MacOS system, we will be updating this README for other OS soon.
### First thing, pull down the repo to your local machine:



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

Enable Management API:

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

### Change Login Credentials:

-   By default, credentials are assumed to be the default RabbitMQ guest/guest.
-   If yours are different, search for "guest" and replace with your own username and password.

 ---
### Let's run!

-   Run the following commands to run your local instance of VisionMQ
    -   `npm install`
    -   `npm run build`
    -   `npm run dev`
-   You will now see an instance available on localhost:/8080.


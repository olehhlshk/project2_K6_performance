# stp_platform_k6
How to start tests on windows with influxdb
Read https://github.com/grafana/xk6-output-influxdb
.\k6.exe run -o xk6-influxdb=http://localhost:8086 .\script.js
.\k6.exe run .\script.js
How to start tests on mac with influxdb
Read https://github.com/grafana/xk6-output-influxdb
command:
K6_INFLUXDB_ORGANIZATION=dd404b724cf1e11a \
K6_INFLUXDB_BUCKET=c6ea5fcf7e7c9367 \
K6_INFLUXDB_TOKEN=Lwy7PbnrePRa42EqoMoNVv-nzzB0WIKJP9F7kP0pBBV-_DmXmGXVbIsE_fHbkA5LLwjYuob-57AlnXk_a-8URw== \
./k6 run -o xk6-influxdb=http://localhost:8086 script_storefront_users.js
How to run tests with influxdb on docker in Cloud on MAC
We have influxDB instance 2.4 hosted in docker in cloud. Ask DevOps to start it if you need it. Dont forget to stop it after test.
command:
K6_INFLUXDB_ORGANIZATION=7632bddd4d67d029 \
K6_INFLUXDB_BUCKET=40c7382a72dd192d \
K6_INFLUXDB_TOKEN=05mPzGoVsfJdsaETSV4Zev4bW1ksdueL8pdL-rQ7x6H1pNiGwcFDMmAlblYRV59eHLfXpnuyK4UNohKE87uvGA== \
./k6 run -o xk6-influxdb=http://a76d5a2568dff42888cd229d8020f101-1778699361.us-west-2.elb.amazonaws.com:8086/ script_storefront_users.js
How to run tests with influxdb on docker in Cloud on WINDOWS
We have influxDB instance 2.4 hosted in docker in cloud. Ask DevOps to start it if you need it. Dont forget to stop it after test.
command:
K6_INFLUXDB_ORGANIZATION=7632bddd4d67d029 \
K6_INFLUXDB_BUCKET=40c7382a72dd192d \
K6_INFLUXDB_TOKEN=05mPzGoVsfJdsaETSV4Zev4bW1ksdueL8pdL-rQ7x6H1pNiGwcFDMmAlblYRV59eHLfXpnuyK4UNohKE87uvGA== \
./k6.exe run -o xk6-influxdb=http://a76d5a2568dff42888cd229d8020f101-1778699361.us-west-2.elb.amazonaws.com:8086/ script_storefront_users.js
InfluxDB cretentials:
Login: Admin
Password: caB5SbUjic5J3tX
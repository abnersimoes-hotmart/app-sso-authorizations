FROM 315120000506.dkr.ecr.us-east-1.amazonaws.com/hotmart/alpine/node/14 as builder

WORKDIR /home/app
COPY build build/

FROM 315120000506.dkr.ecr.us-east-1.amazonaws.com/hotmart/alpine/openresty

COPY --from=builder /home/app/build build/
COPY nginx.conf /etc/nginx/conf.d/default.conf

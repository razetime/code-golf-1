FROM alpine:3.15 as builder

ENV VERSION=e55dc0a

# /dev/urandom is needed.
RUN mkdir /empty /mydev \
 && mknod -m 444 /mydev/urandom c 1 9

RUN apk add --no-cache build-base cmake curl
RUN ls
RUN curl -L https://github.com/niallang/Nial_Development/tarball/$VERSION | tar -xz
RUN mv niallang-Nial_Development-$VERSION/ niallang/
WORKDIR niallang/BuildCore/build
RUN cmake ../src && make
WORKDIR ../../BuildNial
RUN mkdir build
RUN mkdir src
WORKDIR pkgblder
RUN ../../BuildCore/build/nialcore -defs buildfromcore
WORKDIR ../build
RUN cmake ../src
RUN make


COPY nialwrapper.c /
WORKDIR /
RUN gcc -static -s -o nialwrapper nialwrapper.c

FROM scratch

COPY --from=0 /lib/ld-musl-x86_64.so.1 /lib/
COPY --from=0 /empty         /proc
COPY --from=0 /empty         /tmp
COPY --from=0 /niallang/BuildNial/build/nial /nialwrapper /usr/bin/

ENTRYPOINT ["nialwrapper"]

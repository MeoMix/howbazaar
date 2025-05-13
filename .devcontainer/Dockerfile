# Dockerfile
FROM mcr.microsoft.com/devcontainers/base:jammy

# Install dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    wget \
    libicu70 \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

# Download and extract AssetStudioModCLI
RUN mkdir -p /tools/assetstudio && \
    wget -O /tmp/AssetStudio.zip https://github.com/aelurum/AssetStudio/releases/download/v0.18.0/AssetStudioModCLI_net6_linux64.zip && \
    unzip /tmp/AssetStudio.zip -d /tools/assetstudio && \
    rm /tmp/AssetStudio.zip

# Add to PATH
ENV PATH="/tools/assetstudio:${PATH}"

RUN chmod +x /tools/assetstudio/AssetStudioModCLI

# Install .NET 6 to /opt/dotnet (as root)
ENV DOTNET_ROOT="/opt/dotnet"
ENV PATH="${DOTNET_ROOT}:${PATH}"

RUN wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh && \
    chmod +x dotnet-install.sh && \
    ./dotnet-install.sh --runtime dotnet --version 6.0.29 --install-dir /opt/dotnet && \
    rm dotnet-install.sh
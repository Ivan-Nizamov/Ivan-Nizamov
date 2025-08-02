# NixOS Configuration Specification

## System Configuration (`configuration.nix`)

### General Imports
- `hardware-configuration.nix`: Imports hardware configurations.

### Bootloader
- `systemd-boot` enabled.
- EFI variables touch enabled.
- Experimental features: `nix-command`, `flakes`.

### Networking
- Hostname: `nixos`.
- NetworkManager enabled.
- Nameservers: `1.1.1.1`, `8.8.8.8`.

### Localization
- Timezone: `Europe/Bucharest`.
- Default locale: `en_US.UTF-8`.
- Extra locale settings for addresses, identification, measurements, etc.

### Keyboard and Console
- XKB layout: `us,us`, variant `,colemak_dh`, option: `grp:alt_shift_toggle`.
- Console keymap: `us`.

### Display and Sound
- X server disabled; `sddm` display manager enabled with Wayland.
- Pipewire sound system enabled.

### Bluetooth
- Bluetooth and Blueman enabled.

### User and Auto-login
- User `navi` created with extra groups: `networkmanager`, `wheel`, `input`, `video`.
- Auto-login enabled for user `navi`.

### Programs
- Firefox and Xwayland enabled.
- Hyprland enabled with Xwayland.
- Unfree packages allowed.

### Environment Variables
- Environment variables for Wayland and dmenu gruvbox theme colors.

### System Packages
- Includes: `openssh`, `usbutils`, `wget`, `git`, `gparted`, `tree`, `iptables`, `iproute2`, custom `dmenu`.

### Ollama Services
- Ollama service and model loader configured.

### Additional Services
- GVFS, power profiles daemon, and XDG portals.

### Networking
- Extra hosts for blocking websites like YouTube and adult sites.

### Hardware
- 32-bit graphics enabled;
- Udev rules for backlight and keyboard detection.

### Network Management
- Systemd services for controlling network access with timed enable/disable.

### Miscellaneous
- Firewall disabled; Nix garbage collection set weekly.

## Hardware Configuration (`hardware-configuration.nix`)

### Initialization
- Available kernel modules: `xhci_pci`, `nvme`, `usb_storage`, `sd_mod`.
- Kernel modules: `kvm-intel`.

### File Systems
- `/`: ext4, device `/dev/disk/by-uuid/b755f1eb-e49c-45ee-8e15-804af683ecf4`.
- `/boot`: vfat, UUID `DCF2-529B`, options `fmask=0077`, `dmask=0077`.

### Networking
- DHCP enabled by default.

### CPU
- Intel microcode updates enabled.

{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    python3
    python3Packages.qrcode
    python3Packages.pillow
    texlive.combined.scheme-full
  ];

  shellHook = ''
    echo "Personal Website Generator Environment"
    echo "Run 'python3 generate_sites.py' to generate all sites"
    echo "Or use the 'generate' alias"
    
    alias generate="python3 generate_sites.py"
  '';
}

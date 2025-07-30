{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    python3
  ];
  
  shellHook = ''
    echo "Starting local development server..."
    echo "Run: python3 -m http.server 8000"
    echo "Then open: http://localhost:8000"
  '';
}

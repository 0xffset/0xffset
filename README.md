<h1 align="center">Hi <img src="https://raw.githubusercontent.com/RolEYder/RolEYder/master/Hello!.gif" width="30px">, I'm rolEYder</h1>
<p align="center">
<h3 align="center">Computer Student Student | Linux | Quantum Computing | Mathematics</h3>
</p>
<p align="center">
  <em>
  19y/o Self-taught computer research with an interest in branches like Cybersecurity, Quantum Computing, and Mathematics.
  </em> 
  <br>
</p>



  ```perl
// Fermat's last problem x^n+y^n=z^n
#!/usr/bin/perl
use strict;
use warnings;

sub fermat {
	my ($n) = @_;
	for (my $x = 0; $x < 100; $x++) {
		for (my $y = 0; $y < $x+1; $y++) {
			for (my $z = 0; $z < ($x**$n)+($y**$n) +1; $z++) {
				if (($x**$n)+($y**$n) == ($z**$n)) {
					print "$x^$n + $y^$n == $z^$n\n";		
					}
				}
			} 
	}
}

my $e = fermat(5);


```



- 🔭 Bachelor's degree in **Computer Science**  and **Mathematics**
- 🌱 I’m currently learning **Computational Complexity** stuff
- 🌱 I’m currently learning **PowerShell** and **OSCP preparation**
- ⚙️ Mastering: `.py`, `.cpp`, `.c`, `.perl`, `.java`, `.html`, `.css`  `.s`, `.sh`, `.go`


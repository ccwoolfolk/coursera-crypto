Core principles of modern crypto

Formal definitions
- Precision and define security
- Forces definition of what is and isn't important
- 2 components:
  - Threat model: real world capabilities attacker is assumed to have
  - Security guarantee/goal: what we want to prevent

Assumptions
- Clearly stated and unambiguous

Proofs of security
- Move away from design-break-patch


Private-key encryption:
- Key shared in advance
- Potential threat models:
  - Ciphertext-only attack (can only observe ciphertext)
    - Single text? Multiple texts?
  - Known-plaintext attack (can obtain both plain and cipher text examples)
  - Chosen-plaintext attack (attacker can choose plaintext and convert to ciphertext)
  - Chosen-ciphertext attack (can also get parties to decrypt certain encrypted messages as well)

We are assuming ciphertext-only for now with only a single ciphertext.
Generally accepted definition of security: regardless of any prior info the attacker has about the plaintext, the ciphertext should leak no additional information about the plaintext

Event = particular occurrence in some experiment

Conditional Prob = Pr[A | B] = Pr[A and B]/Pr[B]

Two r.v.'s X,Y are independent if for all x,y:
Pr[X=x | Y=y] = Pr[X=x]

(capital letters = random variables, lowercase = values capital letters take)

Law of total probability = say E1, ..., En are a partition of all possibilities. Then for any A:
Pr[A] = SUM Pr[A and Ei] = SUM Pr[A | Ei] * Pr[Ei]
(only 1 "E" can occur but exactly 1 HAS to occur)

Gen = generates key k
c <- Enck(m) (diff ciphertext could result from same key/m)
m := Deck(c)

*M* = message space (all poss messages)
*K* = key space
*C* = ciphertext space

M = random variable for value of the message (M ranges over *M*), taking into account attacker's priors
Ex: Pr[M = 'attack today'] = 0.7
    Pr[M = 'don't attack'] = 0.3

K = random variable denoting the key (K ranges over *K*)
Gen defines a probability distribution for K:
  Pr[K = k] = Pr[Gen outputs key "k"]

We assume that M and K are independent

c <- Enc_k(m) defines a distribution on the ciphertext

Shift cipher example:
k ele in {0, ..., 25}, Pr[K = k] = 1/26
Pr[M='a'] = 0.7, Pr[M='z'] = 0.3
What is Pr[C = 'b']?
Pr[C = 'b']
= Pr[C='a' and k='1']  + Pr[C='z' and k='2']
= Pr[C='a'] * Pr[k='1'] + ...
= 0.7 * 1/26 + 0.3 * 1/26
= 1/26

Encryption scheme is _perfectly secret_, formally is:
Pr[M = m | C = c] = Pr[M = m] - i.e., the cipher text knowledge does not change the assumed distribution of the plaintext
Ex:
  Pr[M = 'one'] = 1/2, Pr[M = 'ten'] = 1/2
  m = 'ten', c='rqh'
  Pr[M = 'ten' | C = 'rqh'] = 0 because shift cipher can't create 'rqh' from 'ten'
  != Pr[M = 'ten'] - the a priori assumption

Bayes's theorem
Pr[A | B] = Pr[B | A] * Pr[A] / Pr[B]

ONE-TIME PAD
Let M = {0, 1}^n, meaning a binary string of length "n"
Gen: k is ele of {0,1}^n
Enc_k(m) = k XOR m
Dec_k(c) = k XOR c

